"use client";
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { registerSchema } from '@/utils/formSchema'
import { useUserStore } from '@/stores/userStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./profile.module.css";

type FormValues = {
    firstName: string;
    lastName: string;
};

interface UpdateProps {
  userData: any;
}

const UpdateName: React.FC<UpdateProps> = ({userData}) => {

  const userStore = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Destructuring user data for first name and last name
  const { firstName = '', lastName = '' } = userData || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // resolver: zodResolver(registerSchema),
  });

  // send data to the "/api/v1/profile/name/{userId}" route
  const onSubmit = async (data: FormValues,) => {

    try {
      setIsSubmitting(true);

      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
      }
      console.log('Submitted Data:', userData);
      console.log('User ID:', userStore.user?._id);
      console.log('Access token:', userStore.accessToken);

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/name/${userStore.user?._id}`

      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${userStore.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      console.log('Response Status:', response.status);
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Response Data:', responseData);
        toast.success('Update successful');
      } else {
        console.error('Failed to update. Status:', response.status);
        toast.error('Update failed');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      setIsSubmitting(false); // Re-enable submit button
    }
  };

  return (
    <>
        <form className={styles.personal} onSubmit={handleSubmit(onSubmit)}>

            <div className={styles.nameField}>
                <label htmlFor="firstName">Firstname:</label>
                <input 
                  {...register("firstName")} 
                  id="firstName" 
                  defaultValue={firstName}
                  className={styles.nameInput} 
                />
                {/* {errors.firstName && <span>{errors.firstName.message}</span>} */}
            </div>

            <div className={styles.nameField}>
                <label htmlFor="lastName">Lastname:</label>
                <input 
                  {...register("lastName")} 
                  id="lastName" 
                  defaultValue={lastName}
                  className={styles.nameInput} 
                />
                {/* {errors.lastName && <span>{errors.lastName.message}</span>} */}
            </div>

            <button type="submit" value="submit" disabled={isSubmitting}
              className={`${styles.saveButton} ${isSubmitting ? styles.loading : ''}`}>
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner} /> {/* spinner */}
                    <span>Updating...</span> {/* while submitting */}
                  </>
                ) : (
                  <span>Update</span>
                )}
            </button>

        </form>
        <ToastContainer />
    </>
  )
}

export default UpdateName