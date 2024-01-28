"use client";
import React, { useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import Link from 'next/link'

import AuthModal from "@/app/(shop)/components/Modals/Authorization/AuthModal";
import UserModal from "@/app/(shop)/components/Modals/User/UserModal";
import BasketModal from "@/app/(shop)/components/Modals/Basket/BasketModal";
import NavModal from "@/app/(shop)/components/Modals/Nav/NavModal";
import styles from './mobilenav.module.css'

const Mobilenav: React.FC = () => {

  const userStore = useUserStore();
  const router = useRouter();

  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  // after clicking on the user icon, if the user is not logged in, display AuthModal
  const handleUserOpen = () => {
    if (!userStore.isLoggedIn) {

      setLoginModal(!loginModal);

    } else {
      setIsUserOpen(true);
    }
  }

  const handleUserClose = () => {
    setIsUserOpen(false);
  }

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

      <button className={styles.mobilenavButton} onClick={handleUserOpen} >
        <Image src="/icons/user.svg" alt="user" width={18} height={18} />
      </button>

      {isNavOpen && <NavModal onClose={handleNavClose} />}

      {isBasketOpen && <BasketModal onClose={handleBasketClose} />}

      {isUserOpen && 
        <UserModal onClose={handleUserClose} userStore={userStore} router={router} />
      }

      {loginModal && 
        <AuthModal onClose={() => {setLoginModal(!loginModal); router.push('/');}} />
      }
        
    </nav>
  )
}

export default Mobilenav