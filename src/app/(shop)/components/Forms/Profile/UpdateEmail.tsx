"use client";
import React from "react";
import { useForm } from "react-hook-form";
// import { zodResolver } from '@hookform/resolvers/zod';
// import { registerSchema } from '@/utils/formSchema'
import { useUserStore } from "@/stores/userStore";
import styles from "./profile.module.css";

type FormValues = {
  email: string;
};

const UpdateEmail = () => {
  const userStore = useUserStore();

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
      const userData = {
        email: data.email,
      };
      console.log("Submitted Data:", userData);
      console.log("User ID:", userStore.user?._id);
      console.log("Access token:", userStore.accessToken);

      const response = await fetch(
        `https://ecommerce-api-5ksa.onrender.com/api/v1/profile/email/${userStore.user?._id}`,
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
        alert("Update successful");
      } else {
        console.error("Failed to update. Status:", response.status);
        alert("Update failed");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <form className={styles.emailField} onSubmit={handleSubmit(onSubmit)}>

        <div>
            <label htmlFor="email">Email:</label>
            <input {...register("email")} id="email" className={styles.emailinput} />
        </div>

        <button type="submit" value="submit" className={styles.updateButton}>Update</button>

    </form>
  )
};

export default UpdateEmail;
