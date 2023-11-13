import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import styles from './wavefrom.module.css';

const WaveformChart = () => {
  const lineChartData = {
    labels: ['2 May', '13 May', '14 May', '15 May', '16 May', '17 May', '18 May'],
    datasets: [
      {
        label: 'Orders',
        data: [30, 40, 14, 30, 55, 70, 58],
        borderColor: 'rgb(39,216,192)',
        tension: 0.5,
        borderWidth: 1,
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        fill: 'start',
        backgroundColor: 'rgb(39,216,192)',
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      y: {
        beginAtZero: false,
        max: 70,
        grid: {
          display: false,
        },
      },
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const doughnutChartData = {
    labels: ['Completed Orders', 'Pending Orders'],
    datasets: [
      {
        data: [25, 10],
        backgroundColor: ['rgb(39,216,192)', 'rgb(123,129,162)'],
      },
    ],
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.lineChartCard}>
        <p className= { `${styles.chartTitle} ${styles.salesTitle}` }>Sales From Social Media</p>
        <Line data={lineChartData as any} options={lineChartOptions} />
      </div>

      <div className={styles.doughnutChartCard}>
        <p className={styles.chartTitle}>Order Status</p>
        <Doughnut className={styles.doughnutChart} data={doughnutChartData} />
      </div>
    </div>
  );
};

export default WaveformChart;