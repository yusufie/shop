"use client"
import React, { useState } from 'react'
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';
import Navmenu from '@/app/(shop)/components/Dropdowns/Navmenu/Navmenu';
import Profilemenu from '@/app/(shop)/components/Dropdowns/Profilemenu/Profilemenu';
import AuthModal from '@/app/(shop)/components/Modals/Authorization/AuthModal';
import Image from 'next/image'
import Link from 'next/link';
import styles from './header.module.css'
import Searchbar from '@/app/(shop)/components/Search/Searchbar/Searchbar';

const Header: React.FC = () => {
  const pathname = usePathname();
  const userStore = useUserStore();

  const [loginModal, setLoginModal] = useState(false);
  const [showNavmenu, setShowNavmenu] = useState(false);
  const [showProfilemenu, setShowProfilemenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState(getSelectedItem(pathname)); // default selected item

  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
  }

  const closeProfileMenu = () => {
    setShowProfilemenu(false);
  };

  const toggleProfilemenu = () => {
    setShowProfilemenu(!showProfilemenu);
  };

  const toggleNavmenu = () => {
    setShowNavmenu(!showNavmenu);
  };

  const handleSelection = (itemName: string) => {
    setSelectedItem(itemName);
    setShowNavmenu(false); // Hide the dropdown after selecting an item
  };

  function getSelectedItem(path: string) {
    // Get the selected item with first letter in uppercase
    return path.substring(1).charAt(0).toUpperCase() + path.substring(2) || 'Grocery';
  }

  const handleAuthModal = () => {
    if (userStore.isLoggedIn) {
      console.log('Navigate to profile page');
      // navigate to the profile page or handle accordingly

    } else {
      setLoginModal(!loginModal);
    }
  };

  const handleLogout = () => {
    userStore.setLoggedOut();
    setShowProfilemenu(false);
  };

  return (
    <section className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`} >

      <div className={styles.left}>

        <Link href={'/'}>
          <div className={styles.logo}>
            <Image src="/images/logo.png" alt="logo" width={160} height={26} />
          </div>
        </Link>

        <button className={styles.selection} onClick={toggleNavmenu}>
          <Image src="/icons/apple.svg" alt="search" width={20} height={20} />
          <span>{selectedItem}</span> {/* Update the span content with the selected item */}
          <Image src="/icons/arrow-dropdown.svg" alt="arrow" width={10} height={10} />
        </button>

        <Searchbar />

      </div>

      <div className={styles.right}>

        <Link href={'/offers'}>
          <button className={styles.pageButton}><span>Offers</span></button>
        </Link>

        <Link href={'/help'}>
          <button className={styles.pageButton}><span>FAQ</span></button>
        </Link>

        <Link href={'/contact'}>
          <button className={styles.pageButton}><span>Contact</span></button>
        </Link>

        {userStore.isLoggedIn && (
          <>
            {userStore.user?.role === 'ADMIN' && (
              <Link href={'/admin/dashboard'}>
                <button className={styles.become}>Admin</button>
              </Link>
            )}
            <button className={styles.profile} onClick={toggleProfilemenu} >
              <Image src="/icons/profile.svg" alt="profile" width={40} height={40} />
            </button>
          </>
        )}

        {!userStore.isLoggedIn && (
          <button className={styles.become} onClick={handleAuthModal}>
            Join
          </button>
        )}

      </div>

      {showNavmenu && <Navmenu handleSelection={handleSelection} selectedItem={selectedItem} />}

      {showProfilemenu && <Profilemenu handleLogout={handleLogout} closeMenu={closeProfileMenu} />}

      {loginModal && <AuthModal onClose={handleAuthModal} />}

    </section>
  )
}

export default Header