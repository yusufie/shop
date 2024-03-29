"use client"
import React, {useEffect, useRef, useState} from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';
import Image from 'next/image'
import Link from 'next/link';

import Navmenu from '@/app/(shop)/components/Dropdowns/Navmenu/Navmenu';
import Profilemenu from '@/app/(shop)/components/Dropdowns/Profilemenu/Profilemenu';
import AuthModal from '@/app/(shop)/components/Modals/Authorization/AuthModal';
import Searchbar from '@/app/(shop)/components/Search/Searchbar/Searchbar';
import GoogleTranslate from '@/utils/GoogleTranslate';
import styles from './header.module.css'

const Header: React.FC = () => {
  const navMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const userStore = useUserStore();

  const [loginModal, setLoginModal] = useState(false);
  const [showNavmenu, setShowNavmenu] = useState(false);
  const [showProfilemenu, setShowProfilemenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState(getSelectedItem(pathname)); // default selected item

  const [scrolled, setScrolled] = useState(false);

  const route = useRouter();


  

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
        setShowNavmenu(false);
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navMenuRef]);

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
    return path.substring(1).charAt(0).toUpperCase() + path.substring(2) || 'Oslo';
  }

  const handleAuthModal = () => {
    if (userStore.isLoggedIn) {
      // navigate to the profile page or handle accordingly
      console.log('Navigate to profile page');
    } else {
      setLoginModal(!loginModal);
    }
  };

  const handleLogout = () => {
    userStore.setLoggedOut();
    setShowProfilemenu(false);
    route.push('/');
    
  };

  return (
    <section className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`} >

      <div className={styles.left}>

        <Link href={'/'}>
          <div className={styles.logo}>
            <Image src="/images/grand.png" alt="logo" width={163} height={45} />
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

        <Link href={'/'}>
          <button className={styles.pageButton}><span>Home</span></button>
        </Link>

        <Link href={'/offers'}>
          <button className={styles.pageButton}><span>Offers</span></button>
        </Link>

        <Link href={'/help'}>
          <button className={styles.pageButton}><span>FAQ</span></button>
        </Link>

        <Link href={'/contact'}>
          <button className={styles.pageButton}><span>Contact</span></button>
        </Link>

        <GoogleTranslate />
        
        {userStore.isLoggedIn && (
          <>
            {userStore.user?.role === 'ADMIN' && (
              <Link href={'/admin'}>
                <button className={styles.become}>Admin</button>
              </Link>
            )}
            <button className={styles.profile} onClick={toggleProfilemenu} >
              {userStore.user?.avatar ? (
                <Image 
                  src={userStore.user.avatar} 
                  alt="profile" width={40} height={40} 
                  className={styles.profileImage}
                />
              ) : (
                <Image 
                  src="/icons/profile.svg" 
                  alt="profile" width={40} height={40} 
                  className={styles.profileImage}
                />
              )}
            </button>
          </>
        )}

        {!userStore.isLoggedIn && (
          <button className={styles.become} onClick={handleAuthModal}>
            Join
          </button>
        )}

      </div>

      {showNavmenu && (<Navmenu ref={navMenuRef} handleSelection={handleSelection} selectedItem={selectedItem} />)}

      {showProfilemenu && <Profilemenu handleLogout={handleLogout} closeMenu={closeProfileMenu} />}

      {loginModal && <AuthModal onClose={handleAuthModal} />}

    </section>
  )
}

export default Header