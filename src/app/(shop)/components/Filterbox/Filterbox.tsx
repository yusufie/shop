"use client";
import { useState } from 'react';
import useSWR from 'swr';
import Accordion from '@/app/(shop)/components/Accordion/Accordion'
import ProductModal from '@/app/(shop)/components/Modals/Product/ProductModal';
import ProductCard from '../Cards/Product/ProductCard';
import styles from './filterbox.module.css'


const fetcher = (url:any) => fetch(url).then((res) => res.json());

const Filterbox = () => {

  const { data: datas, error } = useSWR('https://ecommerce-api-5ksa.onrender.com/api/v1/products', fetcher);

  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleProductModal = (id: number | null) => {
    setSelectedProductId(id);
    setIsProductModalVisible(!isProductModalVisible);
  };

  if (error) return <div>failed to load</div>;
  if (!datas) return <div>loading...</div>;
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