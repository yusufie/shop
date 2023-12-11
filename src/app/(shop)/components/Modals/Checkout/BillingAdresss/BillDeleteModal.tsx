// BillDeleteModal.tsx

import React from "react";
import styles from "./billdeletemodal.module.css";
import Image from "next/image";

interface BillDeleteModalProps {
  onClose: () => void;
  userMatches: any;
  addressIdsToDelete: string[];
}

const BillDeleteModal: React.FC<BillDeleteModalProps> = ({
  onClose,
  userMatches,
  addressIdsToDelete,
}) => {
  const handleDelete = async () => {
    try {
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

      // Her bir ID için DELETE isteği gönder
      for (const addressIdToDelete of addressIdsToDelete) {
        const deleteResponse = await fetch(
          process.env.NEXT_PUBLIC_API_URL +
            `/api/v1/orders/${userId}/address/${addressIdToDelete}`,
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
        console.log(`Address ${addressIdToDelete} deleted. Response:`, responseData);
      }

      onClose(); // Tüm işlemler tamamlandıktan sonra modalı kapat
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
          <Image src="/icons/trash.svg" alt="Trash Can Icon" width={40} height={50} />
          <h1>Delete</h1>
          <p>Are you sure you want to delete the following addresses?</p>
          <ul>
            {userMatches.map((userMatch: any) =>
              userMatch?.addresses?.map((address: any) => (
                <li key={address._id}>{address.addressName}</li>
              ))
            )}
          </ul>
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

export default BillDeleteModal;
