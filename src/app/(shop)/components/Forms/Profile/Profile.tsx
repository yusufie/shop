import styles from "./profile.module.css";

const Profile: React.FC = () => {
  return (
    <section className={styles.profile}>

        <div className={styles.personal}>
          <input type="text" />
          <input type="text" />
          <textarea name="bio" id="" cols={30} rows={10}></textarea>
          <button>Save</button>
        </div>

        <div className={styles.email}>
          <input type="text" />
        </div>

        <div className={styles.contact}>
          <input type="text" />
        </div>

        <div className={styles.address}>
          <div>Billing</div>
          <div>Shipping</div>
        </div>

    </section>
  )
}

export default Profile