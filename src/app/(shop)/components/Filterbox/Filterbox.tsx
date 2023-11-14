"use client";
import React, { useState } from 'react';
import Accordion from '@/app/(shop)/components/Accordion/Accordion'
import ProductModal from '@/app/(shop)/components/Modals/Product/ProductModal';
import ProductCard from '../Cards/Product/ProductCard';
import styles from './filterbox.module.css'

interface Props {
  datas: any
}

const Filterbox: React.FC<Props> = ({datas}) => {

  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleProductModal = (id: number | null) => {
    setSelectedProductId(id);
    setIsProductModalVisible(!isProductModalVisible);
  };

  // console.log(datas);

  return (
    <section className={styles.filterbox}>
      <Accordion />

      <article className={styles.cards}>
        {datas.data.map((data:any) => (
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
          selectedProductId={selectedProductId} // pass the selected product ID
        />
      )}
        
    </section>
  )
}

export default Filterbox