import React, { useState, useEffect } from "react";
import styles from "./billupdatemodal.module.css";
import useSWR, { mutate } from "swr";
import { ToastContainer, toast } from "react-toastify";

interface BillUpdateModalProps {
  onClose: () => void;
  selectedAddressId: any;
  contactItem: any;
}

const BillUpdateModal: React.FC<BillUpdateModalProps> = ({
  onClose,
  selectedAddressId,
  contactItem,
}) => {
  const [newContactNumber, setNewContactNumber] = useState({
    alias: "",
    country: "",
    city: "",
    postalCode: "",
    details: "",
  });

  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const userId = userData ? userData._id : null;

  const { data: addressData } = useSWR(
    selectedAddressId
      ? `/api/v1/orders/${userId}/address/${selectedAddressId}`
      : null
  );

  useEffect(() => {
    if (addressData) {
      setNewContactNumber({
        alias: addressData.alias,
        country: addressData.country,
        city: addressData.city,
        postalCode: addressData.postalCode,
        details: addressData.details,
      });
    } else if (contactItem) {
      setNewContactNumber({
        alias: contactItem.alias,
        country: contactItem.country,
        city: contactItem.city,
        postalCode: contactItem.postalCode,
        details: contactItem.details,
      });
    }
  }, [addressData, contactItem]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Erişim token'ı bulunamadı");
      }

      if (!userId || !selectedAddressId) {
        throw new Error("User ID or selected address ID not found");
      }

      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/${userId}/address/${selectedAddressId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newContactNumber),
        }
      );
          toast.success("Update successful");
      if (!userResponse.ok) {
        throw new Error(
          `User address update failed. HTTP error! Status: ${userResponse.status}`
        );
      }

      mutate(
        `/api/v1/orders/${userId}/address/${selectedAddressId}`,
        undefined,
        true
      );

      onClose();
    } catch (error) {
      console.error("Error:", error);
       toast.error("Update failed");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewContactNumber((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className={styles.checkModal} onClick={handleOverlayClick}>
      <div className={styles.checkModalContent}>
        <h1>Update Address</h1>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.email}>
            <label htmlFor="alias">Title</label>
            <input
              id="alias"
              name="alias"
              value={newContactNumber.alias}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.radios}>
            <div>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={newContactNumber.country}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={newContactNumber.city}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.radios}>
            <div>
              <label htmlFor="postalCode">ZIP</label> <br />
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={newContactNumber.postalCode}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.textarea}>
            <label htmlFor="details">Street Address</label>
            <textarea
              id="details"
              name="details"
              value={newContactNumber.details}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" value="submit" className={styles.btn}>
            Update Address
          </button>
        </form>
        <button onClick={onClose} className={styles.closeLogin}>
          x
        </button>
      </div>
      <ToastContainer />
    </section>
  );
};

export default BillUpdateModal;
