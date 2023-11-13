"use client"

import React from 'react';
import styles from '@/app/(admin)/components/Login/Login.module.css';
import logo from '@/app/(admin)/assets/image/PickBazar.png';
import Image from 'next/image';
import Link from 'next/link';


const LoginModal:React.FC = () => {
    

 
  return (
    <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.img} >
             <Image   src={logo} alt='logo' width={160} height={26} />
                <p>Login in to admin</p> 
            </div>
            <form action="">
              <div className={styles.email}>
                <label htmlFor="">Email</label>
                <input type="email" />
              </div>
              <div className={styles.password}>
                <div className={styles.forgotPassword}>
                <label htmlFor="">Password</label> 
                </div>
                <input type="password" />
              </div>
            <Link href={"/dashboard"} >
             <button   className={styles.btn} >Login</button>  
            </Link> 
            </form>
          
            </div>
         
          </div>
      
  );
};

export default LoginModal;
