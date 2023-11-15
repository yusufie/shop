import styles from "./points.module.css";

const Points: React.FC = () => {
  return (
    <div className={styles.pointsContainer}>
      <h3 className={styles.pointsHeader}>Wallet Points</h3>
      <div className={styles.pointsBody}>
        <div className={styles.values}>
          <span>0</span>
          <span>Total</span>
        </div>
        <div className={styles.values}>
          <span>0</span>
          <span>Used</span>
        </div>
        <div className={styles.values}>
          <span>0</span>
          <span>Available</span>
        </div>
      </div>
    </div>
  );
};

export default Points;
