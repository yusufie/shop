import Image from "next/image";
import Link from "next/link";
import styles from "./UserModal.module.css";

interface ModalProps {
  onClose: () => void;
  userStore: any;
  router: any;
}

const UserModal: React.FC<ModalProps> = ({ onClose, userStore, router }) => {
  const handleLogout = () => {
    userStore.setLoggedOut();
    onClose();
    router.push("/");
  };

  return (
    <section className={`${styles.usermodal} ${styles.open}`}>

      <div className={styles.modalTop}>
        <Link href={"/"}>
          <Image src="/images/grand.png" alt="logo" width={163} height={45} />
        </Link>
        <button className={styles.closeButton} onClick={onClose}>x</button>
      </div>

      <nav className={styles.navButtons}>

        <div className={styles.points}>
          <span>Points</span>
          <span>0</span>
        </div>

        <Link href={"/profile"}>
          <button className={styles.navButton}>Profile</button>
        </Link>

        <Link href={"/orders"}>
          <button className={styles.navButton}>My Orders</button>
        </Link>

        <Link href={"/wishlists"}>
          <button className={styles.navButton}>My Wishlist</button>
        </Link>

        <Link href={"/checkout"}>
          <button className={styles.navButton}>Checkout</button>
        </Link>

        <button className={styles.navButton} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      
    </section>
  );
};

export default UserModal;
