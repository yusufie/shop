import React, { ReactNode } from 'react';
import Navbar from '@/app/(admin)/components/Navbar/Navbar';
import Sidebar from '@/app/(admin)/components/Sidebar/Sidebar';
import styles from "@/app/(admin)/components/Layout/layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.mainContent}>
        <Navbar />
        <div>{children}</div> 
      </div>
    </div> 
  );
};

export default Layout;
