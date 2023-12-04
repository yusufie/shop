"use client";
import React from 'react'
import styles from "./profile.module.css";

const UpdateAddress = () => {
    
  return (
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
  )
}

export default UpdateAddress