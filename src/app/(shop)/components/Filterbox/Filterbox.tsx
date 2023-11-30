"use client";
import React, { useState } from 'react';
import { useStore } from '@/stores/SearchStore';
import Accordion from '@/app/(shop)/components/Accordion/Accordion'
import ProductModal from '@/app/(shop)/components/Modals/Product/ProductModal';
import ProductCard from '../Cards/Product/ProductCard';
import styles from './filterbox.module.css'

interface FilterboxProps {
  datas: any;
  categories: any;
  tree: any;
}

const Filterbox: React.FC<FilterboxProps> = ({datas, categories, tree}) => {

  const { searchQuery } = useStore();

  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string | null) => {
    // Set the selected category when a category is clicked
    setSelectedCategory(categoryId);
  };

  const filterProductsByCategory = (categoryId: string | null) => {
    return datas.products.filter((data: any) => {
      if (!categoryId || categoryId === 'allProducts') {
        // If no category is selected, display all products
        return true; 
      }

      // Check if the product belongs to the selected category or its children
      return data.category._id === categoryId || data.category.parent === categoryId;
    });
  };

  const filteredProducts = filterProductsByCategory(selectedCategory);

  const handleProductModal = (id: number | null) => {
    setSelectedProductId(id);
    setIsProductModalVisible(true);
  };

  return (
    <section className={styles.filterbox} id="filterbox">
      <Accordion 
        tree={tree}
        handleCategoryClick={handleCategoryClick}
      />

      <article className={styles.cards}>
      {filteredProducts
          .filter((data: any) => data.title.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((data: any) => (
            <ProductCard
              key={data._id}
              data={data}
              handleProductModal={handleProductModal}
            />
          ))}
      </article>

      {/* Conditionally render the ProductModal */}
      {isProductModalVisible && (
        <ProductModal
          datas={datas}
          handleProductModal={handleProductModal}
          selectedProductId={selectedProductId}
          categories={categories}
        />
      )}
        
    </section>
  )
}

export default Filterbox