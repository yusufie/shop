import Image from "next/image";
import styles from "./profile.module.css";

const Profile: React.FC = () => {
  return (
    <section className={styles.profile}>

        <form className={styles.personal}>

          <div className={styles.upload}>
            <input type="file" className={styles.customFileinput} />
            <div className={styles.image}>
            <Image src="/icons/upload.svg" alt="upload" width={40} height={30} />
              <p><span>Upload an image</span> or drag and drop PNG, JPG</p>
            </div>
          </div>
          
          <div className={styles.nameField}>
            <label htmlFor="name">Name</label>
            <input type="text"  className={styles.nameInput}/>
          </div>
          
          <div>
          <label htmlFor="bio">Bio</label>
          <textarea name="bio" id="" className={styles.textarea}></textarea>
          </div>
          <button className={styles.saveButton}>Save</button>

        </form>

        <form className={styles.emailField}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" className={styles.emailinput}/>
          </div>
          <button className={styles.updateButton}>Update</button>
        </form>

        <div className={styles.contactField}>
          <div className={styles.contactHeader}>
            <p>Contact Number</p>
            <button className={styles.contactButton}>+ Update
            </button>
          </div>

          <input type="text" className={styles.contactinput}/>
        </div>

        <div className={styles.address}>
          <div>Billing</div>
          <div>Shipping</div>
        </div>

    </section>
  )
}

export default Profile