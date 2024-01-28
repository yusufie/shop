"use client";
import React, { useState, useEffect } from 'react';
import useSWR from "swr";
import { useStore } from '@/stores/SearchStore';

import Middlebar from "@/app/(shop)/components/Middlebar/Middlebar";
import Accordion from '@/app/(shop)/components/Accordion/Accordion'
import ProductModal from '@/app/(shop)/components/Modals/Product/ProductModal';
import ProductCard from '@/app/(shop)/components/Cards/Product/ProductCard';
import Pagination from '@/app/(shop)/components/Pagination/Pagination';
import Sorter from '@/app/(shop)/components/Sorter/Sorter';
import Skeleton from '@/app/(shop)/components/Skeletons/Products/Skeleton';
import styles from './filterbox.module.css'

interface FilterboxProps { categories: any; tree: any; }

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Filterbox: React.FC<FilterboxProps> = ({ categories, tree }) => {

  const { data: datas, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`, fetcher);

  const { searchQuery, resetSearchQuery } = useStore();

  // Reset selected category when searchQuery changes
  useEffect(() => {
    // set pagination for search results
    setCurrentPage(1);
    // reset selected category
    setSelectedCategory(null);
  }, [searchQuery]);

  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [sortType, setSortType] = useState<'asc' | 'desc' | null>('asc');

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const { data: filteredProductsData, error: filteredProductsError } = useSWR(
    selectedCategory
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/category/${selectedCategory}`
      : null,
    fetcher
  );

  const handleCategoryClick = (categoryId: string | null) => {
    // Set the selected category when a category is clicked
    setSelectedCategory(categoryId);
    // Reset to first page when a category is clicked
    setCurrentPage(1);
    // Reset the searchQuery when the category is clicked
    resetSearchQuery();
  };

  const filteredProducts = selectedCategory
  ? filteredProductsData?.products || [] : datas?.products || [];

  const handleSortChange = (sortType: 'asc' | 'desc' | '') => {
    setSortType(sortType === '' ? null : sortType); // null for empty selection
  };

  // Check if sortType is set before sorting
  let sortedFilteredProducts = [...filteredProducts];
  if (sortType !== null) {
    sortedFilteredProducts = sortedFilteredProducts.sort((a, b) => {
      if (sortType === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedFilteredProducts
    ?.filter((data: any) => data?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
    ?.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleProductModal = (id: number | null) => {
    setSelectedProductId(id);
    setIsProductModalVisible(true);
  };

  if (error) return <article className={styles.cards}>Failed to load</article>;

  return (
    <>
    <Middlebar 
      tree={tree}
      handleCategoryClick={handleCategoryClick}
    />

    <section className={styles.filterbox} id="filterbox">

      <div className={styles.accordionWrapper}>
        <Accordion 
          tree={tree}
          handleCategoryClick={handleCategoryClick}
        />
      </div>

      <div className={styles.results}>
        
        <Sorter
          handleSortChange={handleSortChange}
          value={sortType ?? ''}
        />

        {!datas ? (
          <Skeleton />
        ) : (
          <article className={styles.cards}>
            {currentProducts?.map((data: any) => (
              <ProductCard
                key={data._id}
                data={data}
                handleProductModal={handleProductModal}
              />
            ))}
          </article>
        )}

        <Pagination
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          totalProducts={
            sortedFilteredProducts?.filter((data: any) =>
              data?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
            )?.length
          }
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
    </>
  )
}

export default Filterbox