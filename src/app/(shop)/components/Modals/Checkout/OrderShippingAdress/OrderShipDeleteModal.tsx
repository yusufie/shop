import React, { useState, useCallback } from "react";
import styles from "./ordershipdeletemodal.module.css";
import Image from "next/image";
import useSWR, { mutate } from "swr";

interface BillDeleteModalProps {
  onClose: () => void;
  selectedOrderId: any;
}

const OrderShipDeleteModal: React.FC<BillDeleteModalProps> = ({
  onClose,
  selectedOrderId,
}) => {
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const userId = userData ? userData._id : null;

  const { data: deleteResponseData } = useSWR(
    userId && selectedOrderId
      ? `/api/v1/orders/${userId}/address/${selectedOrderId}`
      : null,
    { revalidateOnFocus: true } 
  );

  const handleDelete = useCallback(async () => {
    try {
      if (!selectedOrderId || !userId) {
        console.log("No address selected for deletion or user ID not found.");
        onClose();
        return;
      }

      if (!accessToken) {
        throw new Error("Erişim token'ı bulunamadı");
      }

      setLoading(true);

      await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          `/api/v1/orders/${userId}/address/${selectedOrderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      mutate(
        `/api/v1/orders/${userId}/address/${selectedOrderId}`,
        undefined,
        true
      );

      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  }, [selectedOrderId, userId, accessToken, onClose]);

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
        </div>
        <div className={styles.butContainer}>
          <button onClick={onClose} className={styles.checkButton1}>
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className={styles.checkButton2}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderShipDeleteModal;
