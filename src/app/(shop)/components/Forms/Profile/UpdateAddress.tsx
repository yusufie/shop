"use client";
import React, { useState } from "react";
import { useUserStore } from "@/stores/userStore";
import styles from './profile.module.css';

type Address = {
  _id: string;
  alias: string;
  details: string;
  country: string;
  city: string;
  postalCode: string;
};

type UpdateAddressProps = {
  userData: {
    _id: string;
    addresses: Address[];
  };
};

const UpdateAddress: React.FC<UpdateAddressProps> = ({ userData }) => {
  const userStore = useUserStore();
  const [formFields, setFormFields] = useState<Address[]>(userData.addresses);

  const onSubmit = async (event: React.FormEvent, addressId: string) => {
    event.preventDefault();
    try {
      const addressToUpdate = formFields.find((address) => address._id === addressId);
      if (!addressToUpdate) return;
      console.log("Address to update:", addressToUpdate);

      const userId = userData._id;
      console.log("User ID:", userId);

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/${userId}/address/${addressId}`;
      console.log("API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${userStore.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressToUpdate),
      });

      if (response.ok) {
        const updatedAddress = await response.json();
        const updatedFields = formFields.map((address) =>
          address._id === addressId ? updatedAddress : address
        );
        setFormFields(updatedFields);
        console.log("Address updated successfully:", updatedAddress);
        // Perform any action upon successful address update
      } else {
        console.error("Failed to update address. Status:", response.status);
      }
    } catch (error) {
      console.error("Error occurred while updating address:", error);
    }
  };

  const handleFieldChange = (addressId: string, fieldName: keyof Address, value: string) => {
    const updatedFields = formFields.map((address) =>
      address._id === addressId ? { ...address, [fieldName]: value } : address
    );
    setFormFields(updatedFields);
  };

  return (
    <div className={styles.addressField}>

      <div className={styles.addressHeader}>
        <p>Addresses</p>
        <button className={styles.addButton}>+ Add</button>
      </div>

      <div className={styles.adressButtons}>
      {formFields.map((address) => (
        <form key={address._id} onSubmit={(event) => onSubmit(event, address._id)} className={styles.adressButton}>

          <input
            value={address.alias}
            onChange={(e) => handleFieldChange(address._id, "alias", e.target.value)}
            className={styles.input}
          />

          <input
            value={address.details}
            onChange={(e) => handleFieldChange(address._id, "details", e.target.value)}
            className={styles.input}
          />

          <input
            value={address.country}
            onChange={(e) => handleFieldChange(address._id, "country", e.target.value)}
            className={styles.input}
          />

          <input
            value={address.city}
            onChange={(e) => handleFieldChange(address._id, "city", e.target.value)}
            className={styles.input}
          />

          <input
            value={address.postalCode}
            onChange={(e) => handleFieldChange(address._id, "postalCode", e.target.value)}
            className={styles.input}
          />

          <button type="submit">Update Address</button>
        </form>
      ))}
      </div>
    </div>
  );
};

export default UpdateAddress;



/* 
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useUserStore } from "@/stores/userStore";

type Address = {
  _id: string; // Assuming each address has an _id for identification
  alias: string;
  details: string;
  country: string;
  city: string;
  postalCode: string;
};

type UpdateAddressProps = {
  userData: {
    _id: string; // User ID
    addresses: Address[]; // Array of addresses
  };
};

const UpdateAddress: React.FC<UpdateAddressProps> = ({ userData }) => {
  const userStore = useUserStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Address>();

  const onSubmit = async (data: Address, addressId: string) => {
    try {
      const userId = userData._id;
      console.log("User ID:", userId);

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/${userId}/address/${addressId}`;
      console.log("API URL:", apiUrl);

      console.log("Form Data:", data);

      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${userStore.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Address updated successfully:", responseData);
        // Perform any action upon successful address update
      } else {
        console.error("Failed to update address. Status:", response.status);
      }
    } catch (error) {
      console.error("Error occurred while updating address:", error);
    }
  };

  // Render the form with address fields for updating
  return (
    <div>
      {userData.addresses.map((address, index) => (
        <form key={address._id} onSubmit={handleSubmit((data) => onSubmit(data, address._id))}>

          <Controller
            name="alias"
            control={control}
            defaultValue={address.alias}
            render={({ field }) => <input {...field} id="alias" />}
          />

          <Controller
            name="details"
            control={control}
            defaultValue={address.details}
            render={({ field }) => <input {...field} id="details" />}
          />

          <Controller
            name="country"
            control={control}
            defaultValue={address.country}
            render={({ field }) => <input {...field} id="country" />}
          />

          <Controller
            name="city"
            control={control}
            defaultValue={address.city}
            render={({ field }) => <input {...field} id="city" />}
          />

          <Controller
            name="postalCode"
            control={control}
            defaultValue={address.postalCode}
            render={({ field }) => <input {...field} id="postalCode" />}
          />

          <button type="submit">Update Address</button>
        </form>
      ))}
    </div>
  );
};

export default UpdateAddress;
 */