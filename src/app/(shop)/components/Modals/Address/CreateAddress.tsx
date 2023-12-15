"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useUserStore } from "@/stores/userStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./CreateAddress.module.css";

type FormValues = {
  alias: string;
  details: string;
  country: string;
  city: string;
  postalCode: string;
};

interface UpdateProps {
  userData: any;
  onClose: () => void;
}

const CreateAddress: React.FC<UpdateProps> = ({ userData, onClose }) => {
  const userStore = useUserStore();

  console.log("User Data:", userData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const userData = {
        address: {
          alias: data.alias,
          details: data.details,
          country: data.country,
          city: data.city,
          postalCode: data.postalCode,
        },
      };
      console.log("Submitted Data:", userData);
      console.log("User ID:", userStore.user?._id);
      console.log("Access token:", userStore.accessToken);

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/address/${userStore.user?._id}`;

      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${userStore.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("Response Status:", response.status);

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response Data:", responseData);
        onClose();
        toast.success("Address created successfully");

      } else {
        console.error("Failed to update. Status:", response.status);
        toast.error("Update failed");

      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
    <section className={styles.addressModal} onClick={handleOverlayClick}>
      <div className={styles.addressModalContent}>
        <h1>Create New Address</h1>

        <form className={styles.addressForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.alias}>
            <label htmlFor="alias">Title</label>
            <input {...register("alias")} id="alias" className={styles.input} />
          </div>

          <div className={styles.country}>
            <label htmlFor="country">Country</label>
            <input {...register("country")} id="country" className={styles.input} />
          </div>

          <div className={styles.city}>
            <label htmlFor="city">City</label>
            <input {...register("city")} id="city" className={styles.input} />
          </div>

          <div className={styles.postalCode}>
            <label htmlFor="postalCode">Postal Code</label>
            <input {...register("postalCode")} id="postalCode" className={styles.input} />
          </div>

          <div className={styles.details}>
            <label htmlFor="details">Details</label>
            <textarea 
              {...register("details")} 
              id="details" 
              className={styles.input} 
              cols={5} rows={5}
            />
          </div>

          <button type="submit" value="submit" className={styles.createButton}>
            Create Address
          </button>
        </form>

        <button onClick={onClose} className={styles.closeLogin}>x</button>
      </div>
    </section>
    <ToastContainer />
    </>
  );
};

export default CreateAddress;
