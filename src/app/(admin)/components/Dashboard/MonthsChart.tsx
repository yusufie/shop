import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Title, Legend } from 'chart.js';
import styles from './monthchart.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title, Legend);

const MonthsChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Orders',
        data: [12, 19, 15, 21, 9, 16, 10, 14, 20, 25, 9, 13],
        backgroundColor: 'rgb(41, 218, 192)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20, // Y eksenindeki değerlerin adım büyüklüğü
        },
        grid: {
          display: false, // Arkadaki çizgileri kaldır
        },
      },
      x: {
        grid: {
          display: false, // Arkadaki çizgileri kaldır
        },
      },
    },
  };

  return (
    <div className={styles.monthchart}>
      <p>Sale History</p>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthsChart;