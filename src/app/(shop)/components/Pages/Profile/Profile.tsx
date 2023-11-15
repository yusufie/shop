import Link from 'next/link'
import styles from './profile.module.css'

const Profile: React.FC = () => {

  return (

        <aside className={styles.aside}>

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

        </aside>
  )
}

export default Profile