import React from 'react';
import { FaDollarSign, FaPercent, FaArrowUp, FaUsers } from 'react-icons/fa';
import styles from './fourchart.module.css';

const FourChart: React.FC = () => {
  const data = [
    {
      title: 'Total Revenue',
      value: '$711.66',
      icon: <FaDollarSign size={24} color="#3498db" />,
      details: [
        '(Last 30 Days)',
        'Revenue up',
        '(previous 30 days)',
      ],
      linkColor: '#3498db',
    },
    {
      title: 'Total Order',
      value: '88,568',
      icon: <FaPercent size={24} color="#2ecc71" />,
      details: [
        '(Last 30 Days)',
        'Order down',
        '(previous 30 days)',
      ],
      linkColor: '#2ecc71',
    },
    {
      title: 'New Customer',
      value: '5,678',
      icon: <FaArrowUp size={24} color="#e74c3c" />,
      details: [
        '(Last 30 Days)',
        'Customer up',
        '(previous 30 days)',
      ],
      linkColor: '#e74c3c',
    },
    {
      title: 'Total Delivery',
      value: '78,000',
      icon: <FaUsers size={24} color="#f39c12" />,
      details: [
        '(Last 30 Days)',
        'Delivery up',
        '(previous 30 days)',
      ],
      linkColor: '#f39c12',
    },
  ];

  return (
    <div className={styles.chartContainer}>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        {data.map((item, index) => (
          <div key={index} className={ `${styles.chartItem}`} >
            <div className={styles.icon}>{item.icon}</div>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.value}>{item.value}</p>
            {item.details.map((detail, i) => (
              <p key={i} className={styles.details}>{detail}</p>
            ))}
            <a href="#" className={styles.link}>Full Details</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FourChart;