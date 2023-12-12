import React, { useState, useCallback } from "react";
import styles from "./billdeletemodal.module.css";
import Image from "next/image";
import useSWR, { mutate } from "swr";

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
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>("");
  const accessToken = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const userId = userData ? userData._id : null;

  const { data: deleteResponseData } = useSWR(
    userId && selectedAddressId
      ? `/api/v1/orders/${userId}/address/${selectedAddressId}`
      : null,
    { revalidateOnFocus: true } // Yeniden çekmeyi odaklandığında gerçekleştir
  );

  const handleAddressSelection = useCallback((addressId: string) => {
    setSelectedAddressId(addressId);
  }, []);

  const handleDelete = useCallback(async () => {
    try {
      if (!selectedAddressId || !userId) {
        console.log("No address selected for deletion or user ID not found.");
        onClose();
        return;
      }

      if (!accessToken) {
        throw new Error("Erişim token'ı bulunamadı");
      }

      await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          `/api/v1/orders/${userId}/address/${selectedAddressId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );      
      mutate(`/api/v1/orders/${userId}/address/${selectedAddressId}`,
        undefined,
        true
      );

      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  }, [selectedAddressId, userId, accessToken, onClose]);

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
                  onClick={() => handleAddressSelection(contactItem._id)}
                  className={
                    selectedAddressId === contactItem._id ? styles.selected : ""
                  }
                >
                  <div
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {contactItem.country && contactItem.city
                      ? `${contactItem.country} ${contactItem.city}  ${contactItem._id}`
                      : "Unknown Address"}
                  </div>
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
