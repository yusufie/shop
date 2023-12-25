"use client";
import React, { useState } from "react";
import { useUserStore } from "@/stores/userStore";
import CreateAddress from "@/app/(shop)/components/Modals/Address/CreateAddress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./profile.module.css";

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
  const [addAddress, setAddAddress] = useState(false);
  const [formFields, setFormFields] = useState<Address[]>(userData.addresses);

  const onUpdate = async (event: React.FormEvent, addressId: string) => {
    event.preventDefault();
    try {
      const addressToUpdate = formFields.find(
        (address) => address._id === addressId
      );
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
        toast.success("Update successful");
      } else {
        console.error("Failed to update address. Status:", response.status);
        toast.error("Update failed");
      }
    } catch (error) {
      console.error("Error occurred while updating address:", error);
    }
  };

  const handleFieldChange = (
    addressId: string,
    fieldName: keyof Address,
    value: string
  ) => {
    const updatedFields = formFields.map((address) =>
      address._id === addressId ? { ...address, [fieldName]: value } : address
    );
    setFormFields(updatedFields);
  };

  const onDelete = async (addressId: string) => {
    try {
      const userId = userData._id;
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/${userId}/address/${addressId}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userStore.accessToken}`,
        },
      });

      if (response.ok) {
        const updatedFields = formFields.filter(
          (address) => address._id !== addressId
        );
        setFormFields(updatedFields);
        console.log("Address deleted successfully", updatedFields);
        toast.success("Address deleted");
      } else {
        console.error("Failed to delete address. Status:", response.status);
        toast.error("Failed to delete address");
      }
    } catch (error) {
      console.error("Error occurred while deleting address:", error);
    }
  };

  const handleAddAddress = () => {
    setAddAddress(!addAddress);
  };

  return (
    <>
      <div className={styles.addressField}>
        <div className={styles.addressHeader}>
          <p>Addresses</p>
          <button className={styles.addButton} onClick={handleAddAddress}>
            + Add
          </button>
        </div>

        <div className={styles.addressItems}>
          {formFields.map((address) => (
            <div key={address._id} className={styles.addressItem}>
              <form
                key={address._id}
                onSubmit={(event) => onUpdate(event, address._id)}
                className={styles.addressForm}
              >
                <label htmlFor="alias">Title</label>
                <input
                  className={styles.input}
                  placeholder="Home, Office, etc."
                  value={address.alias}
                  onChange={(e) => handleFieldChange(address._id, "alias", e.target.value) }
                />

                <label htmlFor="details">Details</label>
                <input
                  className={styles.input}
                  placeholder="Street, building, floor, etc."
                  value={address.details}
                  onChange={(e) => handleFieldChange(address._id, "details", e.target.value) }
                />

                <label htmlFor="city">City</label>
                <input
                  className={styles.input}
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => handleFieldChange(address._id, "city", e.target.value) }
                />

                <label htmlFor="postalCode">Postal Code</label>
                <input
                  className={styles.input}
                  placeholder="Postal Code"
                  value={address.postalCode}
                  onChange={(e) => handleFieldChange(address._id, "postalCode", e.target.value) }
                />

                <label htmlFor="country">Country</label>
                <input
                  className={styles.input}
                  placeholder="Country"
                  value={address.country}
                  onChange={(e) => handleFieldChange(address._id, "country", e.target.value) }
                />

                <button type="submit" className={styles.updateButton}>Update Address</button>
              </form>
              
              <button onClick={() => onDelete(address._id)} 
                className={styles.deleteButton}>
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {addAddress && (
        <CreateAddress
          userData={userData}
          onClose={() => {setAddAddress(false);}}
        />
      )}

      <ToastContainer />
    </>
  );
};

export default UpdateAddress;
