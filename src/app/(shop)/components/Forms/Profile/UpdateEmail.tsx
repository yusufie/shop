"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { zodResolver } from '@hookform/resolvers/zod';
// import { registerSchema } from '@/utils/formSchema'
import { useUserStore } from "@/stores/userStore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./profile.module.css";

type FormValues = {
  email: string;
};

interface UpdateProps {
  userData: any;
}

const UpdateEmail: React.FC<UpdateProps> = ({userData}) => {

  const userStore = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Destructuring user data for email
  const { email = "" } = userData || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // resolver: zodResolver(registerSchema),
  });

  // send data to the "/api/v1/profile/email/{userId}" route
  const onSubmit = async (data: FormValues) => {

    try {
      setIsSubmitting(true);

      const userData = {
        email: data.email,
      };
      console.log("Submitted Data:", userData);
      console.log("User ID:", userStore.user?._id);
      console.log("Access token:", userStore.accessToken);


      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/email/${userStore.user?._id}`;

      const response = await fetch(apiUrl,

        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${userStore.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      console.log("Response Status:", response.status);

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response Data:", responseData);
        toast.success('Update successful');
      } else {
        console.error("Failed to update. Status:", response.status);
        toast.error('Update failed');
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setIsSubmitting(false); // Re-enable submit button
    }
  };

  return (
    <>
    <form className={styles.emailField} onSubmit={handleSubmit(onSubmit)}>

        <div>
            <label htmlFor="email">Email:</label>
            <input 
              {...register("email")} 
              id="email" 
              defaultValue={email}
              className={styles.emailinput} 
            />
        </div>

        <button type="submit" value="submit" disabled={isSubmitting}
            className={`${styles.updateButton} ${isSubmitting ? styles.loading : ''}`}>
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
};

export default UpdateEmail;
