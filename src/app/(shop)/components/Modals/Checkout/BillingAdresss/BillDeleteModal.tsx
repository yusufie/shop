import React, { useState, useEffect } from "react";
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
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  useEffect(() => {
    console.log(
      "Component mounted or selectedAddressId changed:",
      selectedAddressId
    );
  }, [selectedAddressId]);

  const handleDelete = async () => {
    try {
      console.log("Selected Address ID:", selectedAddressId);
      console.log("Address IDs to Delete:", addressIdsToDelete);

      if (!selectedAddressId) {
        console.log("No address selected for deletion.");
        onClose();
        return;
      }

      if (!addressIdsToDelete.includes(selectedAddressId)) {
        console.log("Selected address is not in the list to delete.");
        onClose();
        return;
      }

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
          `/api/v1/orders/${userId}/address/${selectedAddressId}`,
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
      console.log(
        `Address ${selectedAddressId} deleted. Response:`,
        responseData
      );

      onClose();
    } catch (error) {
      console.error("Error:", error);
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
          <Image
            src="/icons/trash.svg"
            alt="Trash Can Icon"
            width={40}
            height={50}
          />
          <h1>Delete</h1>
          <p>Select the address you want to delete:</p>
          <ul>
            {userMatches.map((userMatch: any) =>
              userMatch?.addresses?.map((contactItem: any) => (
                <li
                  key={contactItem._id}
                  onClick={() => {
                    console.log("Clicked!", contactItem._id);
                    setSelectedAddressId(contactItem._id);
                  }}
                  className={
                    selectedAddressId === contactItem._id ? styles.selected : ""
                  }
                >
                  {contactItem.country && contactItem.city
                    ? `${contactItem.country} ${contactItem.city}`
                    : "Unknown Address"}
                </li>
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






















































































































