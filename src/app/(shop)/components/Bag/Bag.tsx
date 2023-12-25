"use client";
import React, { useState } from "react";
import Image from "next/image";
import useBasketStore from '@/stores/basketStore';
import BasketModal from "@/app/(shop)/components/Modals/Basket/BasketModal";

import styles from "./bag.module.css";

const Bag: React.FC = () => {
  
  const items = useBasketStore((state) => state.items);
  const addedItemCounts = useBasketStore((state) => state.addedItemCounts);

  const totalPrice = Object.keys(addedItemCounts).reduce((total, key) => 
    total + (addedItemCounts[key] || 0) * items.find((item) => item._id.toString() === key)?.price!, 0 ).toFixed(2);

  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const handleBasketOpen = () => {
    setIsBasketOpen(true);
  };

  const handleBasketClose = () => {
    setIsBasketOpen(false);
  };

  return (
    <>
      <button className={styles.bag} onClick={handleBasketOpen}>
        <div className={styles.bagIcon}>
          <Image src="/images/bag.png" alt="Bag" width={14} height={16} />
          <span>{items.length} Item</span>
        </div>
        <span className={styles.price}>{totalPrice}kr</span>
      </button>
      
      {isBasketOpen && <BasketModal onClose={handleBasketClose} />}
    </>
  );
};

export default Bag;
