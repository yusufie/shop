"use client"
import React, { useState } from "react";
import Image from "next/image";
import styles from './accordion.module.css'

interface AccordionProps {
  categories: any;
  subCategories: any;
  onSubcategoryClick: (subcategoryId: string | null) => void;
}

const Accordion: React.FC<AccordionProps> = ({ categories, subCategories, onSubcategoryClick, }) => {

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderSubCategories = (categoryId: string) => {
    const subCategoriesForCategory = subCategories.subCategories.filter(
      (sub: any) => sub.category?._id === categoryId
    );
    return subCategoriesForCategory.map((subCategory:any) => (
      <p 
        key={subCategory._id} 
        className={styles.sub}
        onClick={() => onSubcategoryClick(subCategory._id)}
        >
        {subCategory.title}
      </p>
    ));
  };

  return (
    <section className={styles.accordion}>
      {categories.categories.map((category:any, index:any) => (
        <div className={styles.accordionContainer} key={category._id}>

          <div className={`${styles.accordionItem} ${index === activeIndex ? styles.active : ""}`}
            onClick={() => handleClick(index)} >

            <div className={styles.accordionTitle}>
              <Image src={category.coverImage} alt={category.title} width={20} height={20} />
              <span>{category.title}</span>
            </div>

            <Image src="/icons/arrow-down.svg" alt="arrow-down" width={8} height={8} />
          </div>

          {index === activeIndex && (
            <div className={styles.accordionContent}>
              {renderSubCategories(category._id)}
            </div>
          )}
          
        </div>
      ))}
    </section>
  );
};

export default Accordion;