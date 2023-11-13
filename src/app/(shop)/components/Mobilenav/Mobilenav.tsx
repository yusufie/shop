"use client";
import React, { useState } from "react";
import Image from 'next/image'
import Link from 'next/link'
import BasketModal from "@/app/(shop)/components/Modals/Basket/BasketModal";
import styles from './mobilenav.module.css'
import NavModal from "../Modals/Nav/NavModal";

const Mobilenav: React.FC = () => {

  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavOpen = () => {
    setIsNavOpen(true);
  }

  const handleNavClose = () => {
    setIsNavOpen(false);
  }

  const handleBasketOpen = () => {
    setIsBasketOpen(true);
  };

  const handleBasketClose = () => {
    setIsBasketOpen(false);
  };

  return (
    <nav className={styles.mobilenav}>

      <button className={styles.mobilenavButton} onClick={handleNavOpen}>
        <Image src="/icons/lines.svg" alt="lines" width={25} height={18} />
      </button>

      <Link href={"/"}>
        <button className={styles.mobilenavButton}>
          <Image src="/icons/home.svg" alt="home" width={18} height={20} />
        </button>
      </Link>

      <button className={styles.mobilenavButton} onClick={handleBasketOpen}>
        <Image src="/icons/pouch.svg" alt="pouch" width={18} height={18} />
      </button>

      <button className={styles.mobilenavButton}>
        <Image src="/icons/user.svg" alt="user" width={18} height={18} />
      </button>

      {isNavOpen && <NavModal onClose={handleNavClose} />}

      {isBasketOpen && <BasketModal onClose={handleBasketClose} />}
        
    </nav>
  )
}

export default Mobilenav