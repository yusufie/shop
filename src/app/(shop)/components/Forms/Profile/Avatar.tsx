"use client";
import React, { useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import Image from "next/image";
import styles from "./profile.module.css";

const Avatar = () => {
  const userStore = useUserStore();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };
  
  const uploadImage = async (file: File) => {
    const imageFormData = new FormData();
    imageFormData.append('file', file);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/upload/single`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userStore.accessToken}`,
        },
        body: imageFormData,
      });

      if (!response.ok) {
        throw new Error(`Image upload failed. HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.result.url; // Return the uploaded image URL
    } catch (error) {
      console.error('Error occurred during image upload', error);
      return null;
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      return; // No image selected, handle accordingly
    }
  
    const imageUrl = await uploadImage(selectedImage);
    console.log('Access token:', userStore.accessToken);
  
    if (imageUrl) {
      try {
        const formData = new FormData();
        formData.append('image', imageUrl); // Append imageUrl to the FormData object
  
        console.log('formData:', formData); // Log FormData for verification
        console.log('Image URL:', imageUrl);
        console.log('User ID:', userStore.user?._id);
  
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/image/${userStore.user?._id}`;
        const response = await fetch(apiUrl, {
          method: 'PATCH', // Consider using 'PATCH' for updating resources
          headers: {
            Authorization: `Bearer ${userStore.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: imageUrl }),
        });
  
        if (response.ok) {
          console.log('User avatar updated successfully!');
          // Perform any additional actions upon successful avatar update
        } else {
          console.error('Failed to update user avatar');
        }
      } catch (error) {
        console.error('Error occurred while updating user avatar', error);
      }
    }
  };

  return (
    <section className={styles.personal}>

      <div className={styles.upload}>

        <input type="file" accept="image/*" onChange={handleImageChange} className={styles.customFileinput}/>
        
        <div className={styles.image}>
            <Image src="/icons/upload.svg" alt="upload" width={40} height={30} />
            <p><span>Upload an image</span> or drag and drop PNG, JPG</p>
        </div>

      </div>

      <button onClick={handleImageUpload} className={styles.saveButton}>Save</button>

    </section>
  );
};

export default Avatar;
