"use client"
import React, { useState } from "react";
import styles from "@/app/(admin)/components/Rewiews/Rewiews.module.css";
import useSWR from "swr";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Rewiews = () => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [isFocused, setIsFocused] = useState(false);
  const [productIdInput, setProductIdInput] = useState("");
  const [productId, setProductId] = useState(""); 

  const { data: datas, error } = useSWR(
    `https://ecommerce-api-5ksa.onrender.com/api/v1/reviews/product/${productId}`,
    fetcher
  );

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleProductIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductIdInput(event.target.value);
  };

  const handleSearchClick = () => {
    setProductId(productIdInput);
  };

  if (error) return <div>Loading failed</div>;
  if (!datas) return <div>Loading...</div>;

  

  return (
    <>
      <div className={styles.topcontainer}>
        <div className={styles.container}>
          <div style={{ color: "#161F6A", fontWeight: "bold" }}>Reviews</div>
          <div>
            <input
              type="text"
              id={styles.myInput}
              className={isFocused ? styles.focused : ""}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Ex: Search By Id"
              value={productIdInput}
              onChange={handleProductIdChange}
            />
          </div>
          <div>
            <select
              className={styles.select}
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="option1">Product Type</option>
              <option value="option2">Grocery</option>
              <option value="option3">Women Cloth</option>
              <option value="option4">Bags</option>
              <option value="option5">Makeup</option>
            </select>
          </div>
          <div>
            <button className={styles.button} onClick={handleSearchClick}>
              Search
            </button>
          </div>
        </div>
        <div className={styles.container2}>
          <ul>
            <li>User</li>
            <li>Product</li>
            <li>Review</li>
            <li>Rating</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Rewiews;









































































