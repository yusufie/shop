// FourChart.tsx
import React from "react";
import styles from "./FourChart.module.css";
import { DeliveryIcon } from "@/app/(admin)/assets/icons/DeliveryIcon";
import { CoinIcon } from "@/app/(admin)/assets/icons/CoinIcon";
import { CartIconBig } from "@/app/(admin)/assets/icons/CartIconBig";
import { UserIcon } from "@/app/(admin)/assets/icons/UserIcon";
import { IosArrowUp } from "@/app/(admin)/assets/icons/IosArrowUp";
import { IosArrowDown } from "../AllSvgIcon";
import Link from "next/link";

const FourChart: React.FC = () => {
  const data = [
    {
      title: "Total Revenue",
      value: "$711.66",
      icon: <CoinIcon />,
      date: "(Last 30 Days)",
      details: "Revenue up",
      arrowİcon: <IosArrowUp />,
      note: "(previous 30 days)",
      color: "rgb(105,228,238)",
    },
    {
      title: "Total Order",
      value: "88,568",
      icon: <CartIconBig />,
      date: "(Last 30 Days)",
      details: "Order down",
      arrowİcon: <IosArrowDown />,
      note: "(previous 30 days)",
      color: "rgb(252,108,144)",
    },
    {
      title: "New Customer",
      value: "5,678",
      icon: <UserIcon />,
      date: "(Last 30 Days)",
      details: "Customer up",
      arrowİcon: <IosArrowUp />,
      note: "(previous 30 days)",
      color: "rgb(105,228,238)",
    },
    {
      title: "Total Delivery",
      value: "78,000",
      icon: <DeliveryIcon />,
      date: "(Last 30 Days)",
      details: "Delivery Up",
      arrowİcon: <IosArrowUp />,
      note: "(previous 30 days)",
      color: "rgb(105,228,238)",
    },
  ];

  return (
    <div className={styles.chartContainer}>
      {data.map((item, index) => (
        <div key={index} className={`${styles.chartItem}`}>
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>{item.title}</h1>
              <h3 className={styles.date}>{item.date}</h3>
            </div>
            <span className={styles.icon}>{item.icon}</span>
          </div>
          <h3 className={styles.value}>{item.value}</h3>
          <h3 className={styles.details}>
            {" "}
            <span style={{ color: item.color, fontWeight: 600, fontSize: 13 }}>
              {item.arrowİcon} {item.details}
            </span>{" "}
            {item.note}{" "}
          </h3>
          <Link href="#" className={styles.link}>
            Full Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FourChart;
