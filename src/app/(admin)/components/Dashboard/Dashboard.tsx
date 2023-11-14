"use client";

import styles from "./dashboard.module.css";
import React from "react";
import Card from "./Card";
import FourChart from "./FourChart";
import MonthsChart from "./MonthsChart";
import WaveformChart from "./WaveformChart";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Card />
      <FourChart />
      <WaveformChart />
      <MonthsChart />
    </div>
  );
};

export default Dashboard;
