"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useUserStore } from "@/stores/userStore";
import styles from "./profile.module.css";

type FormValues = {
  alias: string;
  details: string;
  country: string;
  city: string;
  postalCode: string;
};

interface UpdateProps {
  userData: any;
}

const CreateAddress: React.FC<UpdateProps> = ({userData}) => {
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
    <form className={styles.addressField} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.addressHeader}>
        <p>Addresses</p>
        <button className={styles.addButton}>+ Add</button>
      </div>

      <div className={styles.adressButtons}>
        <div className={styles.adressButton}>
          <label htmlFor="alias">Alias</label>
          <input {...register("alias")} id="alias" className={styles.input} />

          <label htmlFor="details">Details</label>
          <input
            {...register("details")}
            id="details"
            className={styles.input}
          />

          <label htmlFor="country">Country</label>
          <input
            {...register("country")}
            id="country"
            className={styles.input}
          />

          <label htmlFor="city">City</label>
          <input {...register("city")} id="city" className={styles.input} />

          <label htmlFor="postalCode">Postal Code</label>
          <input
            {...register("postalCode")}
            id="postalCode"
            className={styles.input}
          />
        </div>
      </div>

      <button type="submit" value="submit" className={styles.updateButton}>
        Save
      </button>
    </form>
  );
};

export default CreateAddress;