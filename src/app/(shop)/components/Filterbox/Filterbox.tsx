"use client";
import React, { useState, useEffect } from 'react';
import { useStore } from '@/stores/SearchStore';
import Accordion from '@/app/(shop)/components/Accordion/Accordion'
import ProductModal from '@/app/(shop)/components/Modals/Product/ProductModal';
import ProductCard from '../Cards/Product/ProductCard';
import styles from './filterbox.module.css'

interface FilterboxProps {
  datas: any;
  categories: any[];
  subCategories: any[];
}

const Filterbox: React.FC<FilterboxProps> = ({datas, categories, subCategories}) => {

  const { searchQuery } = useStore();

  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  

  const handleProductModal = (id: number | null) => {
    setSelectedProductId(id);
    setIsProductModalVisible(true);
  };

  // console.log(datas);
  useEffect(() => {
    if (selectedSubcategory) {
      // Filter products based on the selected subcategory
      const filtered = datas.data.filter(
        (data: any) => data.subcategories.includes(selectedSubcategory)
      );
      setFilteredProducts(filtered);
    } else {
      // If no subcategory is selected, display all products
      setFilteredProducts(datas.data);
    }
  }, [selectedSubcategory, datas]);

  return (
    <section className={styles.filterbox} id="filterbox">
      <Accordion 
      categories={categories} 
      subCategories={subCategories}
      onSubcategoryClick={setSelectedSubcategory}
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
          subCategories={subCategories}
        />
      )}
        
    </section>
  )
}

export default Filterbox