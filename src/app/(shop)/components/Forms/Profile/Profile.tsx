"use client";
import React from 'react'
import styles from "./profile.module.css";
import Avatar from './Avatar';
import UpdateName from './UpdateName';
import UpdateEmail from './UpdateEmail';

const Profile: React.FC = () => {
  return (
    <section className={styles.profile}>

      <Avatar />

      <UpdateName />

      <UpdateEmail />

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