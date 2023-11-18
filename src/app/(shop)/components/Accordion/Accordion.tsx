"use client"
import React, { useState } from "react";
import Image from "next/image";
import styles from './accordion.module.css'

interface AccordionProps {
  categories: any[];
  subCategories: any[];
}

const Accordion: React.FC<AccordionProps> = ({ categories, subCategories }) => {

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderSubCategories = (categoryId: string) => {
    const subCategoriesForCategory = subCategories.filter(
      (sub) => sub.category?._id === categoryId
    );
    return subCategoriesForCategory.map((subCategory) => (
      <p key={subCategory._id} className={styles.sub}>
        {subCategory.title}
      </p>
    ));
  };

  return (
    <section className={styles.accordion}>
      {categories.map((category, index) => (
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