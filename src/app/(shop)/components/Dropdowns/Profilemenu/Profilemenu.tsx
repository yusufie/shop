"use client";
import React, { useRef, useEffect } from 'react';
import Link from "next/link";
import styles from "./profilemenu.module.css";

interface ProfilemenuProps {
  handleLogout: () => void;
  closeMenu: () => void;
}

const Profilemenu: React.FC<ProfilemenuProps> = ({ handleLogout, closeMenu }) => {

  const profilemenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (profilemenuRef.current && !profilemenuRef.current.contains(event.target as Node)) {
      closeMenu(); // Close the Profilemenu if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <section className={styles.profilemenu} ref={profilemenuRef}>
        
      <div className={styles.menuHeader}>
        <span>Points</span>
        <span>0</span>
      </div>

      <Link href={"/profile"}>
        <button>
          <span>Profile</span>
        </button>
      </Link>

      <Link href={"/orders"}>
        <button>
          <span>My Orders</span>
        </button>
      </Link>

      <Link href={"/wishlists"}>
        <button>
          <span>My Wishlist</span>
        </button>
      </Link>

      <Link href={"/checkout"}>
        <button>
          <span>Checkout</span>
        </button>
      </Link>

      <button onClick={handleLogout}>
        <span>Logout</span>
      </button>
    </section>
  );
};

export default Profilemenu;
