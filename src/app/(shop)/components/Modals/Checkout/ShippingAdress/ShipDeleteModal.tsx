// CheckoutUpdateModal.tsx
import React, { useState } from "react";
import styles from "./shipdeletemodal.module.css";
import Image from "next/image";

interface ShipDeleteModalProps {
  onClose: () => void;
  addressIdsToDelete: string[];
  userMatches: any;
}

const ShipDeleteModal: React.FC<ShipDeleteModalProps> = ({
  onClose,
  addressIdsToDelete,
  userMatches,
}) => {
  // !!!Burayı dinamik yap*!!
  const adressId = userMatches.data[3].addresses[0]._id;
  console.log(adressId);
  const handleDelete = async () => {
    // DELETE isteği için gerekli işlemleri burada gerçekleştirin
    // Örneğin, bir API çağrısı yapabilirsiniz
    try {
      // Örnek bir DELETE isteği
      const accessToken = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");
      let userId;

      if (!accessToken) {
        throw new Error("Erişim token'ı bulunamadı");
      }

      if (user) {
        const userData = JSON.parse(user);
        userId = userData._id;
      }

      if (!userId) {
        throw new Error("User ID not found");
      }

      const deleteResponse = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          `/api/v1/orders/${userId}/address/${adressId}`, // Kullanılacak adres ID'sini ayarlayın
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error(
          `Address delete failed. HTTP error! Status: ${deleteResponse.status}`
        );
      }

      const responseData = await deleteResponse.json();
      console.log("Delete Response:", responseData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.trash}>
          <Image src="/icons/trash.svg" alt="star" width={40} height={50} />
          <h1>Delete</h1>
          <p>Are you sure you want to delete?</p>
        </div>
        <div className={styles.butContainer}>
          <button onClick={onClose} className={styles.checkButton1}>
            Cancel
          </button>
          <button onClick={handleDelete} className={styles.checkButton2}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShipDeleteModal;
