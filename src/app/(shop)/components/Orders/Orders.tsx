"use client";
import React, { useState, useEffect } from 'react';
import { useUserStore } from "@/stores/userStore";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import OrderCard from "@/app/(shop)/components/Cards/Order/OrderCard";
import OrderDetails from "@/app/(shop)/components/Details/Order/OrderDetails";
import AuthModal from "@/app/(shop)/components/Modals/Authorization/AuthModal";
import styles from "./orders.module.css";
import CardLoading from '../Modals/Loading/CardLoading';

const fetcher = async (url: string, accessToken: string | null) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  return res.json();
};

const Orders: React.FC = () => {
  const userStore = useUserStore();
  const userId = userStore.user?._id;
  const accessToken = userStore.accessToken;
  const router = useRouter();

  const { data: orderData, error } = useSWR(
    userId
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/user/${userId}`
      : null,
    (url) => (url ? fetcher(url, accessToken) : null)
  );

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

    // Set selectedOrder to the first order when orderData changes or when component mounts
    useEffect(() => {
      if (orderData && orderData.length > 0) {
        setSelectedOrder(orderData[0]);
      }
    }, [orderData]);

  // Check if the user is logged in
  if (!userStore.isLoggedIn) {
    // Display AuthModal if the user is not logged in
    return <AuthModal onClose={() => router.push("/orders")} />;
  }

  if (error) return <div>failed to load</div>;
  // orderData will be undefined initially and will be updated once data is fetched
  if (!orderData) return <CardLoading/>;

  const handleOrderDetails = (order: any) => {
    setSelectedOrder(order);
  };

  return (
    <section className={styles.orders}>
      <div className={styles.myOrders}>
        <h3>My Orders</h3>
        {orderData?.map((order: any) => (
          <OrderCard
            key={order?._id}
            order={order}
            handleOrderDetails={handleOrderDetails}
            // Check if the current order is selected
            isSelected={selectedOrder?._id === order?._id}
          />
        ))}
      </div>
      <OrderDetails selectedOrder={selectedOrder} />
    </section>
  );
};

export default Orders;