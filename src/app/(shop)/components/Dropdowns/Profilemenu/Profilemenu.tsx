import Link from "next/link";
import styles from "./profilemenu.module.css";

interface ProfilemenuProps {
  handleLogout: () => void;
}

const Profilemenu: React.FC<ProfilemenuProps> = ({ handleLogout }) => {
  return (
    <section className={styles.profilemenu}>
        
      <div className={styles.menuHeader}>
        <span>Points</span>
        <span>0</span>
      </div>

      <Link href={"/profile"}>
        <button>
          <span>Profile</span>
        </button>
      </Link>

      <Link href={"/orders"}>
        <button>
          <span>My Orders</span>
        </button>
      </Link>

      <Link href={"/wishlists"}>
        <button>
          <span>My Wishlist</span>
        </button>
      </Link>

      <Link href={"/checkout"}>
        <button>
          <span>Checkout</span>
        </button>
      </Link>

      <button onClick={handleLogout}>
        <span>Logout</span>
      </button>
    </section>
  );
};

export default Profilemenu;
