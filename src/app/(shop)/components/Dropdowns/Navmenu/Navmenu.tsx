import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import styles from './navmenu.module.css'

interface NavmenuProps {
  handleSelection: (selectedItem: string) => void;
  selectedItem: string;
}

const Navmenu: React.FC<NavmenuProps> = ({ handleSelection, selectedItem }) => {

    const handleButtonClick = (itemName: string) => {
        handleSelection(itemName);
      };
    
      return (
        <section className={styles.navmenu}>
    
          <Link href="/grocery">
            <button onClick={() => handleButtonClick('Oslo')}>
              <Image src="/icons/apple.svg" alt="Grocery" width={16} height={20} />
              <span className={selectedItem === 'Oslo' ? styles.active : ''}>Oslo</span>
            </button>
          </Link>
    
          <Link href="/bakery">
            <button onClick={() => handleButtonClick('Sandnes')}>
              <Image src="/icons/bakery.svg" alt="Bakery" width={16} height={20} />
              <span className={selectedItem === 'Sandnes' ? styles.active : ''}>Sandnes</span>
            </button>
          </Link>
    
          <Link href="/makeup">
            <button onClick={() => handleButtonClick('Vestfold')}>
              <Image src="/icons/makeup.svg" alt="Makeup" width={16} height={20} />
              <span className={selectedItem === 'Vestfold' ? styles.active : ''}>Vestfold</span>
            </button>
          </Link>
    
          <Link href="/bags">
            <button onClick={() => handleButtonClick('Nordland')}>
              <Image src="/icons/suitcase.svg" alt="Bags" width={16} height={20} />
              <span className={selectedItem === 'Nordland' ? styles.active : ''}>Nordland</span>
            </button>
          </Link>
    
          <Link href="/clothing">
            <button onClick={() => handleButtonClick('Telemark')}>
              <Image src="/icons/cloth.svg" alt="Clothing" width={16} height={20} />
              <span className={selectedItem === 'Telemark' ? styles.active : ''}>Telemark</span>
            </button>
          </Link>
    
          <Link href="/furniture">
            <button onClick={() => handleButtonClick('Finmark')}>
              <Image src="/icons/furniture.svg" alt="Furniture" width={16} height={20} />
              <span className={selectedItem === 'Finmark' ? styles.active : ''}>Finmark</span>
            </button>
          </Link>

        </section>
      )
    }
    
    export default Navmenu