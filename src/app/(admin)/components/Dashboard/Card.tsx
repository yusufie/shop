 import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from './Card.module.css';

const Card: React.FC = () => {
  const nestedDonutChartData = {
    labels: ['Completed Orders', 'Pending Orders'],
    datasets: [
      {
        data: [25, 75],
        backgroundColor: ['rgb(39,216,192)', 'rgb(123,129,162)'],
        borderWidth: 0,
      },
    ],
  };

  const nestedDonutChartOptions = {
    cutout: '70%',
    plugins: {
      doughnutlabel: {
        labels: [
          {
            text: '25%', // İlk iç yuvarlak için metin
            font: {
              size: '20',
              weight: 'bold',
            },
          },
        ],
      },
    },
  };

  const lineChartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'
    ],
    datasets: [
      {
        label: 'Orders',
        data: [200, 150, 430, 320, 600, 309, 500, 273, 370, 180],
        backgroundColor: 'rgba(75,192,192,0.1)',
        borderColor: 'rgb(39,216,192)',
        tension: 0.2,
        borderWidth: 7,
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      y: {
        beginAtZero: false,
        max: 700,
        grid: {
          display: false,
        },
      },
      x: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.doughnutCard}>
        <p>Target</p>
        <Doughnut
          style={{ marginTop: '20px' }}
          data={nestedDonutChartData}
          options={nestedDonutChartOptions as any}
        />
      </div>

      <div className={styles.lineChartCard}>
        <div>
          <p>User Hit Rate</p>
          <Line data={lineChartData as any} options={lineChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Card;

