"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from './accordion.module.css'

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
  handleCategoryClick: (categoryId: string) => void;
}

const Accordion: React.FC<AccordionProps> = ({ tree, handleCategoryClick }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const handleAccordionClick = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }

    handleCategoryClick(categoryId);
  };

  const renderCategories = (categories: Category[]) => {
    return categories.map((category: Category) => (
      <div className={styles.accordionContainer} key={category._id}>
        <div
          className={`${styles.accordionItem}`}
          onClick={() => {
            handleAccordionClick(category._id);
            handleCategoryClick(category._id);
          }}
        >
          <div className={styles.accordionTitle}>
            {/* <Image src={category.coverImage} alt={category.title} width={20} height={20} /> */}
            <span>{category.name}</span>
          </div>
          {category.children.length > 0 && (
            <Image
              src="/icons/arrow-down.svg"
              alt="arrow-down"
              width={8}
              height={8}
              className={expandedCategories.includes(category._id) ? styles.expanded : ''}
            />
          )}
        </div>
        {expandedCategories.includes(category._id) && (
          <div className={styles.subCategories}>
            {category.children.map((childCategory: Category) => (
              <div key={childCategory._id}>
                <div
                  className={`${styles.accordionItem}`}
                  onClick={() => {
                    handleAccordionClick(childCategory._id);
                    handleCategoryClick(childCategory._id);
                  }}
                >
                  <div className={styles.accordionTitle} >
                    {/* <Image src={childCategory.coverImage} alt={childCategory.title} width={20} height={20} /> */}
                    <span>{childCategory.name}</span>
                  </div>
                  {childCategory.children.length > 0 && (
                    <Image
                      src="/icons/arrow-down.svg"
                      alt="arrow-down"
                      width={8}
                      height={8}
                      className={expandedCategories.includes(childCategory._id) ? styles.expanded : ''}
                    />
                  )}
                </div>
                {childCategory.children.length > 0 && expandedCategories.includes(childCategory._id) && (
                  <div className={styles.subCategories}>
                    {renderCategories(childCategory.children)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  // Find the "All Products" category and render its immediate children
  const allProductsCategory = tree.categories.find(category => category.name === "All Products");

  return (
    <section className={styles.accordion}>
      {allProductsCategory && renderCategories(allProductsCategory.children)}
    </section>
  );
};

export default Accordion;