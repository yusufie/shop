"use client";
import React, { useState } from 'react';
import { useStore } from '@/stores/SearchStore';
import Accordion from '@/app/(shop)/components/Accordion/Accordion'
import ProductModal from '@/app/(shop)/components/Modals/Product/ProductModal';
import ProductCard from '@/app/(shop)/components/Cards/Product/ProductCard';
import Pagination from '@/app/(shop)/components/Pagination/Pagination';
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

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18;

  const handleCategoryClick = (categoryId: string | null) => {
    // Set the selected category when a category is clicked
    setSelectedCategory(categoryId);
    // Reset to first page when a category is clicked
    setCurrentPage(1);
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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts
    .filter((data: any) => data.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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

    <div className={styles.results}>
      {/* Product cards */}
      <article className={styles.cards}>
        {currentProducts.map((data: any) => (
          <ProductCard
            key={data._id}
            data={data}
            handleProductModal={handleProductModal}
          />
        ))}
      </article>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
      />
    </div>

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