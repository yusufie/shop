import React, { ReactNode } from 'react';
import Points from '../Points/Points';
import Navigation from '../Navigation/Navigation';
import styles from "./aside.module.css";

interface AsideProps {
  children: ReactNode;
}

const Aside: React.FC<AsideProps> = ({ children }) => {

  return (
        <main className={styles.mainAside}>

            <aside className={styles.aside}>
              <Points />
              <Navigation />
            </aside>
        
            {children}
        </main>
  );
};

export default Aside;