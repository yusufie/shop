import React from "react";
import styles from "./OrderCard.module.css";

interface CardProps {
  order: any;
  handleOrderDetails: (order: any) => void;
  isSelected: boolean;
}

const OrderCard: React.FC<CardProps> = ({ order, handleOrderDetails, isSelected  }) => {

  const cardClass = isSelected ? `${styles.ordersCard} ${styles.selected}` : styles.ordersCard;

  return (
    <div
      className={cardClass}
      onClick={() => handleOrderDetails(order)}
    >
      <div className={styles.cardHeader}>
        <span className={styles.orderNumber}>{order?._id}</span>
        <span className={styles.orderStatus}>{order?.status}</span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardRow}>
          <span>Order Date</span>
          <span>:</span>
          <span>{new Date(order?.createdAt).toLocaleDateString()}</span>
        </div>

        <div className={styles.cardRow}>
          <span>Delivery Time</span>
          <span>:</span>
          <span>{order?.deliverySchedule}</span>
        </div>

        <div className={styles.cardRow}>
          <span>Amount</span>
          <span>:</span>
          <span>{order?.total}</span>
        </div>

        <div className={styles.cardRow}>
          <span>Total Price</span>
          <span>:</span>
          <span>{order?.totalAfterDiscount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
