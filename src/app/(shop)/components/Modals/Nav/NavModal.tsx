import Image from 'next/image'
import Link from 'next/link';
import styles from './navmodal.module.css'

interface NavModalProps {
  onClose: () => void;
}

const NavModal: React.FC<NavModalProps> = ({onClose}) => {

  return (
    <section className={`${styles.navmodal} ${styles.open}`}>

        <div className={styles.modalTop}>
          <Link href={"/"}>
            <Image src="/images/logo.png" alt="Bag" width={160} height={26} />
          </Link>
          <button className={styles.closeButton} onClick={onClose}>x</button>
        </div>

        <nav className={styles.navButtons}>

          <Link href={"/offers"}>
            <button className={styles.navButton}>Offers</button>
          </Link>

          <Link href={"/help"}>
            <button className={styles.navButton}>FAQ</button>
          </Link>

          <Link href={"/contact"}>
            <button className={styles.navButton}>Contact</button>
          </Link>

        </nav>

    </section>
  )
}

export default NavModal