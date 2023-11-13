"use client";
import { useState } from 'react';
import useSWR from 'swr';



import styles from './productfunc.module.css'


const fetcher = (url:any) => fetch(url).then((res) => res.json());

const ProductFunc = () => {

  const { data: datas, error } = useSWR('https://ecommerce-api-5ksa.onrender.com/api/v1/products', fetcher);

  
  

  
  
  if (error) return <div>failed to load</div>;
  if (!datas) return <div>loading...</div>;
  console.log(datas.data);

  return (
    <section className={styles.filterbox}>
     

      <article className={styles.cards}>
      
      
      
      
      
      
      
      </article>

   
   
   
   
   
   
   
   
   
    </section>
  )
}

export default ProductFunc