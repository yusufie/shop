import React, { ReactNode } from 'react';
import Header from '@/app/(shop)/components/Header/Header';
import styles from "./layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
        <main className={styles.mainLayout}>
            <Header />
        
            {children}
        </main>
  );
};

export default Layout;