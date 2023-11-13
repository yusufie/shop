"use client"
import React, { useState } from 'react';
import styles from '@/app/(admin)/components/Products/Products.module.css';
import Modal from '@/app/(admin)/components/Modal/Modal';
import useSWR from 'swr';
import Image from 'next/image';

const fetcher = (url:any) => fetch(url).then((res) => res.json());

const Product = () => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { data: datas, error } = useSWR('https://ecommerce-api-5ksa.onrender.com/api/v1/products', fetcher);

  if (error) return <div>Loading failed</div>;
  if (!datas) return <div>Loading...</div>;
  console.log(datas);

  const handleSelectChange = (event:any) => {
    setSelectedOption(event.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSearch = () => {
    const filteredResults = datas?.data.filter((item:any) =>
      item?.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <>
      <div className={styles.topcontainer}>
        <div className={styles.container}>
          <div style={{ color: "#161F6A", fontWeight: "bold" }}>
            Product
          </div>
          <div>
            <select className={styles.select} value={selectedOption} onChange={handleSelectChange}>
              <option value="option6">Price</option>
              <option value="option7">Highest to Lowest</option>
              <option value="option8">Lowest To Highest</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              id={styles.myInput}
              className={isFocused ? styles.focused : ""}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder='Örnek: İsme Göre Ara'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} className={styles.button}>
              Ara
            </button>
          </div>
          <div> </div>
          <button onClick={openModal} className={styles.button}>+ Add Product</button>
          {isModalOpen && <Modal onClose={closeModal} />}
        </div>
        <div className={styles.cardcontainer} >
          {searchResults.length > 0 ? (
            searchResults.map((item:any) => (
              <div className={styles.card} key={item._id}>
                <div className={styles.cardImg}>
                  <Image src={item.images[0]} alt={item.name} width={256} height={256} />
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.cardPrice}>${item.price}</span>
                  <p>{item.title}</p>
                  <div className={styles.afterButton}>
                    <button >-</button>
                    <span></span>
                    <button >+</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            datas?.data.map((item:any) => (
              <div className={styles.card} key={item._id}>
                <div className={styles.cardImg}>
                  <Image src={item.images[0]} alt={item.name} width={256} height={256} />
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.cardPrice}>${item.price}</span>
                  <p>{item.title}</p>
                  <div className={styles.afterButton}>
                    <button >-</button>
                    <span></span>
                    <button >+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
