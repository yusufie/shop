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

      <Link href={"/wishlists"}>
        <button className={`${styles.navButton} ${pathname === "/wishlists" ? styles.active : ""}`}>
          My Wishlists
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
