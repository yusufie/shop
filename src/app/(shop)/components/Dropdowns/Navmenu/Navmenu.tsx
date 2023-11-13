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
            <button onClick={() => handleButtonClick('Grocery')}>
              <Image src="/icons/apple.svg" alt="Grocery" width={16} height={20} />
              <span className={selectedItem === 'Grocery' ? styles.active : ''}>Grocery</span>
            </button>
          </Link>
    
          <Link href="/bakery">
            <button onClick={() => handleButtonClick('Bakery')}>
              <Image src="/icons/bakery.svg" alt="Bakery" width={16} height={20} />
              <span className={selectedItem === 'Bakery' ? styles.active : ''}>Bakery</span>
            </button>
          </Link>
    
          <Link href="/makeup">
            <button onClick={() => handleButtonClick('Makeup')}>
              <Image src="/icons/makeup.svg" alt="Makeup" width={16} height={20} />
              <span className={selectedItem === 'Makeup' ? styles.active : ''}>Makeup</span>
            </button>
          </Link>
    
          <Link href="/bags">
            <button onClick={() => handleButtonClick('Bags')}>
              <Image src="/icons/suitcase.svg" alt="Bags" width={16} height={20} />
              <span className={selectedItem === 'Bags' ? styles.active : ''}>Bags</span>
            </button>
          </Link>
    
          <Link href="/clothing">
            <button onClick={() => handleButtonClick('Clothing')}>
              <Image src="/icons/cloth.svg" alt="Clothing" width={16} height={20} />
              <span className={selectedItem === 'Clothing' ? styles.active : ''}>Clothing</span>
            </button>
          </Link>
    
          <Link href="/furniture">
            <button onClick={() => handleButtonClick('Furniture')}>
              <Image src="/icons/furniture.svg" alt="Furniture" width={16} height={20} />
              <span className={selectedItem === 'Furniture' ? styles.active : ''}>Furniture</span>
            </button>
          </Link>
    
          <Link href="/daily">
            <button onClick={() => handleButtonClick('Daily')}>
              <Image src="/icons/apple.svg" alt="Daily" width={16} height={20} />
              <span className={selectedItem === 'Daily' ? styles.active : ''}>Daily</span>
            </button>
          </Link>
    
          <Link href="/books">
            <button onClick={() => handleButtonClick('Books')}>
              <Image src="/icons/book.svg" alt="Books" width={16} height={20} />
              <span className={selectedItem === 'Books' ? styles.active : ''}>Books</span>
            </button>
          </Link>
        </section>
      )
    }
    
    export default Navmenu