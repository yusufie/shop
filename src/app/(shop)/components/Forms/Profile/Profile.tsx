"use client";
import React from 'react'
// import { useUserStore } from '@/stores/userStore'
import Image from "next/image";
import styles from "./profile.module.css";
// import Avatar from './Avatar';
import UpdateName from './UpdateName';

const Profile: React.FC = () => {
  return (
    <section className={styles.profile}>

      {/* <Avatar /> */}
        <form className={styles.personal}>

          <div className={styles.upload}>
            <input type="file" className={styles.customFileinput} />
            <div className={styles.image}>
            <Image src="/icons/upload.svg" alt="upload" width={40} height={30} />
              <p><span>Upload an image</span> or drag and drop PNG, JPG</p>
            </div>
          </div>

          <button type="submit" className={styles.saveButton}>Save</button>

        </form>

        <UpdateName />
        
{/*     <form className={styles.personal}>
          
          <div className={styles.nameField}>
            <label htmlFor="firstName">firstName</label>
            <input type="text"  className={styles.nameInput} />
          </div>

          <div className={styles.nameField}>
            <label htmlFor="lastName">lastName</label>
            <input type="text"  className={styles.nameInput} />
          </div>
          
          <button className={styles.saveButton}>Save</button>

        </form> */}

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
            <button className={styles.contactButton}>+ Update</button>
          </div>

          <input type="text" className={styles.contactinput}/>
        </div>

        <div className={styles.addressField}>
          <div className={styles.addressHeader}>
            <p>Addresses</p>
            <button className={styles.addButton}>+ Add</button>
          </div>

          <div className={styles.adressButtons}>
            <button className={styles.adressButton}>
              <p className={styles.title}>Billing</p>
              <p className={styles.address}>2231 Kidd Avenue, AK, Kipnuk, 99614, United States</p>
            </button>

            <button className={styles.adressButton}>
              <p className={styles.title}>Shipping</p>
              <p className={styles.address}>2231 Kidd Avenue, AK, Kipnuk, 99614, United States</p>
            </button>
          </div>

        </div>

    </section>
  )
}

export default Profile