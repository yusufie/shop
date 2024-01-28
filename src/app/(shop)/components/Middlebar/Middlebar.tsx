"use client";
import React, { useState } from "react";
import Image from 'next/image'
import styles from './middlebar.module.css'
import FilterModal from "@/app/(shop)/components/Modals/Filter/FilterModal";

interface Category {
  _id: string;
  name: string;
  slug: string;
  parent: string | null;
  children: Category[];
}

interface AccordionProps {
  tree: {
    categories: Category[];
  };
  handleCategoryClick: (categoryId: string | null) => void;
}

const Middlebar: React.FC<AccordionProps> = ({ tree, handleCategoryClick }) => {

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterOpen = () => {
    setIsFilterOpen(true);
  }

  const handleFilterClose = () => {
    setIsFilterOpen(false);
  }

  return (
    <section className={styles.middlebar}>

        <button className={styles.middlebarButton} onClick={handleFilterOpen}>
          <Image src={'/icons/equalizer.svg'} width={18} height={18} alt="filter" />
          <span>Filter</span>
        </button>

{/*     <button className={styles.middlebarButton}>
          <span>Grocery</span>
        </button> */}

        {isFilterOpen && (
          <FilterModal 
            onClose={handleFilterClose} 
            tree={tree}
            handleCategoryClick={handleCategoryClick}
          />
        )}

    </section>
  )
}

export default Middlebar