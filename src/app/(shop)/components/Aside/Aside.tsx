import React, { ReactNode } from 'react';
import Profile from '@/app/(shop)/components/Pages/Profile/Profile';
import styles from "./aside.module.css";

interface AsideProps {
  children: ReactNode;
}

const Aside: React.FC<AsideProps> = ({ children }) => {

  return (
        <main className={styles.mainAside}>
            <Profile />
        
            {children}
        </main>
  );
};

export default Aside;