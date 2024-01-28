"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useUserStore } from "@/stores/userStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./profile.module.css";

interface UpdateProps {
  userData: any;
}

const UpdateAvatar: React.FC<UpdateProps> = ({ userData }) => {
  const userStore = useUserStore();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const uploadImage = async (file: File) => {
    const imageFormData = new FormData();
    imageFormData.append("file", file);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/upload/single`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userStore.accessToken}`,
        },
        body: imageFormData,
      });

      if (!response.ok) {
        throw new Error(
          `Image upload failed. HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      return data.url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error occurred during image upload", error);
      toast.error("Image upload failed. Please try again.");
      return null;
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      toast.error("Please select an image to upload.");
      return; // No image selected, handle accordingly
    }

    const imageUrl = await uploadImage(selectedImage);

    if (imageUrl) {
      try {
        const formData = new FormData();
        formData.append("image", imageUrl); // Append imageUrl to the FormData object

        console.log("formData:", formData); // Log FormData for verification
        console.log("Image URL:", imageUrl);
        console.log("User ID:", userStore.user?._id);

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/image/${userStore.user?._id}`;

        const response = await fetch(apiUrl, {
          method: "PATCH", // Consider using 'PATCH' for updating resources
          headers: {
            Authorization: `Bearer ${userStore.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: imageUrl }),
        });

        if (response.ok) {
          console.log("User avatar updated successfully!");
          toast.success("Avatar updated successfully!");
        } else {
          console.error("Failed to update user avatar");
          toast.error("Failed to update user avatar");
        }
      } catch (error) {
        console.error("Error occurred while updating user avatar", error);
      }
    }
  };

  return (
    <>
      <section className={styles.personal}>
        <div className={styles.upload}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.customFileinput}
          />

          <div className={styles.image}>
            {selectedImage ? (
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt="preview"
                width={100}
                height={100}
                className={styles.previewImage}
              />
            ) : (
              <>
                <Image src="/icons/upload.svg" alt="upload" width={40} height={30} />
                <p><span>Upload an image</span> or drag and drop PNG, JPG </p>
              </>
            )}
          </div>

          <Image 
            src={userData?.avatar} 
            alt="user image" 
            width={50} height={50}
            className={styles.userImage}
          />
        </div>

        <button onClick={handleImageUpload} className={styles.saveButton}>
          Save
        </button>
        
      </section>

      <ToastContainer />
    </>
  );
};

export default UpdateAvatar;
