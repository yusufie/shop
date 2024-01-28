"use client";
import React, { useState } from 'react';
import { useStore } from '@/stores/SearchStore';
import Image from 'next/image'
import styles from './searchbox.module.css'

const Searchbox: React.FC = () => {

  const { setSearchQuery, searchQuery } = useStore();
  const [inputValue, setInputValue] = useState<string>('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent from reloading the page 
    setSearchQuery(inputValue);

    // Reset the input value
    setInputValue('');

    // Scroll to the Filterbox component
    const filterboxElement = document.getElementById('filterbox');
    if (filterboxElement) {
      filterboxElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (

    <section className={styles.search}>
        <form className={styles.searchForm} onSubmit={handleFormSubmit}>
            <input 
              className={styles.searchInput} 
              type="text" 
              placeholder="Search your products..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className={styles.searchButton} type="submit">
              <Image src="/icons/search.svg" alt="search" width={20} height={20} />
              <span>Search</span>
            </button>
        </form>

    </section>
  )
}

export default Searchbox