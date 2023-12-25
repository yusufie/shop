"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./accordion.module.css";

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

const Accordion: React.FC<AccordionProps> = ({ tree, handleCategoryClick }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleAccordionClick = (categoryId: string) => {
    if (categoryId === "allProducts") {
      // Set selectedCategory to null for "All Products" category
      handleCategoryClick(null);
    } else {
      if (expandedCategories.includes(categoryId)) {
        setExpandedCategories(
          expandedCategories.filter((id) => id !== categoryId)
        );
      } else {
        setExpandedCategories([...expandedCategories, categoryId]);
      }
      // Pass the category ID when clicked
      handleCategoryClick(categoryId);
    }

    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);

    window.scrollTo({ top: 900, behavior: "smooth" });
  };

  const renderCategories = (categories: Category[]) => {
    return categories?.map((category: Category) => (
      <div className={styles.accordionContainer} key={category._id}>
        <div
          className={`${styles.accordionItem}`}
          onClick={() => {
            handleAccordionClick(category?._id);
            handleCategoryClick(category?._id);
          }}
        > 
          <div className={styles.accordionTitle}>
            {/* <Image src={category.coverImage} alt={category.title} width={20} height={20} /> */}
            <span
              style={{
                color:
                  selectedCategory === category._id
                    ? "rgb(0, 159, 127)"
                    : "rgb(75, 85, 99)",
              }}
            >
              {category?.name}
            </span>
          </div>
          {category?.children.length > 0 && category?._id !== "allProducts" && (
            <Image
              src="/icons/arrow-down.svg"
              alt="arrow-down"
              width={8}
              height={8}
              className={
                expandedCategories.includes(category._id) ? styles.expanded : ""
              }
            />
          )}
        </div>
        {expandedCategories?.includes(category?._id) &&
          category?._id !== "allProducts" && (
            <div className={styles.subCategories}>
              {category?.children.map((childCategory: Category) => (
                <>
                  <div
                    key={childCategory?._id}
                    className={`${styles.accordionItem}`}
                    onClick={() => {
                      handleAccordionClick(childCategory?._id);
                      handleCategoryClick(childCategory?._id);
                    }}
                  >
                    <div className={styles.accordionTitle}>
                      {/* <Image src={childCategory.coverImage} alt={childCategory.title} width={20} height={20} /> */}
                      <span
                        style={{
                          color:
                            selectedCategory === childCategory._id
                              ? "rgb(0, 159, 127)"
                              : "rgb(75, 85, 99)",
                        }}
                      >
                        {childCategory?.name}
                      </span>
                    </div>
                    {childCategory?.children.length > 0 && (
                      <Image
                        src="/icons/arrow-down.svg"
                        alt="arrow-down"
                        width={8}
                        height={8}
                        className={
                          expandedCategories.includes(childCategory._id)
                            ? styles.expanded
                            : ""
                        }
                      />
                    )}
                  </div>
                  {childCategory?.children.length > 0 &&
                    expandedCategories?.includes(childCategory._id) && (
                      <div className={styles.subCategories}>
                        {renderCategories(childCategory.children)}
                      </div>
                    )}
                </>
              ))}
            </div>
          )}
      </div>
    ));
  };

  // Find the "All Products" category and render its immediate children
  const allProductsCategory = tree.categories?.find(
    (category) => category.name === "All Products"
  );

  return (
    <section className={styles.accordion}>
      {allProductsCategory && (
        <div
          className={styles.accordionContainer}
          key={allProductsCategory._id}
        >
          <div
            className={`${styles.accordionItem}`}
            onClick={() => handleAccordionClick("allProducts")}
          >
            <div className={styles.accordionTitle}>
              {allProductsCategory.name}{" "}
              {/* Display "All Products" category name */}
            </div>
          </div>
        </div>
      )}
      {allProductsCategory && renderCategories(allProductsCategory.children)}
    </section>
  );
};

export default Accordion;
