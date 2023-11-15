import Link from 'next/link'
import styles from "./navigation.module.css";

const Navigation: React.FC = () => {
  return (
    <nav className={styles.navigation}>
      <Link href={"/profile"}>
        <button className={styles.navButton}>Profile</button>
      </Link>

      <Link href={"/change-password"}>
        <button className={styles.navButton}>Change Password</button>
      </Link>

      <Link href={"/orders"}>
        <button className={styles.navButton}>My Orders</button>
      </Link>

      <Link href={"/downloads"}>
        <button className={styles.navButton}>Downloads</button>
      </Link>

      <Link href={"/wishlists"}>
        <button className={styles.navButton}>My Wishlists</button>
      </Link>

      <Link href={"/questions"}>
        <button className={styles.navButton}>My Questions</button>
      </Link>

      <Link href={"/refunds"}>
        <button className={styles.navButton}>My Refunds</button>
      </Link>

      <Link href={"/reports"}>
        <button className={styles.navButton}>My Reports</button>
      </Link>

      <Link href={"/cards"}>
        <button className={styles.navButton}>My Cards</button>
      </Link>

      <Link href={"/help"}>
        <button className={styles.navButton}>Need Help</button>
      </Link>

      <div className={styles.logout}>
        <button className={styles.logoutButton}>Logout</button>
      </div>
    </nav>
  );
};

export default Navigation;
