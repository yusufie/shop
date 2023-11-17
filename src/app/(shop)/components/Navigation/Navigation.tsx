"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import styles from "./navigation.module.css";

const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.navigation}>
      <Link href={"/profile"}>
        <button className={`${styles.navButton} ${pathname === "/profile" ? styles.active : ""}`}>
          Profile
        </button>
      </Link>

      <Link href={"/change-password"}>
        <button className={`${styles.navButton} ${pathname === "/change-password" ? styles.active : ""}`}>
          Change Password
        </button>
      </Link>

      <Link href={"/orders"}>
        <button className={`${styles.navButton} ${pathname === "/orders" ? styles.active : ""}`}>
          My Orders
        </button>
      </Link>

      <Link href={"/downloads"}>
        <button className={`${styles.navButton} ${pathname === "/downloads" ? styles.active : ""}`}>
          Downloads
        </button>
      </Link>

      <Link href={"/wishlists"}>
        <button className={`${styles.navButton} ${pathname === "/wishlists" ? styles.active : ""}`}>
          My Wishlists
        </button>
      </Link>

      <Link href={"/questions"}>
        <button className={`${styles.navButton} ${pathname === "/questions" ? styles.active : ""}`}>
          My Questions
        </button>
      </Link>

      <Link href={"/refunds"}>
        <button className={`${styles.navButton} ${pathname === "/refunds" ? styles.active : ""}`}>
          My Refunds
        </button>
      </Link>

      <Link href={"/reports"}>
        <button className={`${styles.navButton} ${pathname === "/reports" ? styles.active : ""}`}>
          My Reports
        </button>
      </Link>

      <Link href={"/cards"}>
        <button className={`${styles.navButton} ${pathname === "/cards" ? styles.active : ""}`}>
          My Cards
        </button>
      </Link>

      <Link href={"/help"}>
        <button className={`${styles.navButton} ${pathname === "/help" ? styles.active : ""}`}>
          Need Help
        </button>
      </Link>

      <div className={styles.logout}>
        <button className={styles.logoutButton}>Logout</button>
      </div>
    </nav>
  );
};

export default Navigation;
