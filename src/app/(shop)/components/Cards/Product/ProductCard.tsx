
"use client";
import React from 'react';
import useBasketStore from '@/stores/basketStore';
import Image from 'next/image';
import animateFlyImage from '@/utils/animation';
import styles from './productcard.module.css'

type ProductCardProps = {
  data: any;
  handleProductModal: (id: number | null) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ data, handleProductModal }) => {
  const [showImage, setShowImage] = React.useState(false);
  const [addedItem, setAddedItem] = React.useState<any>(null);

  const addItem = useBasketStore((state) => state.addItem);
  const addedItemCounts = useBasketStore((state) => state.addedItemCounts);
  const removeItem = useBasketStore((state) => state.removeItem);

  const handleDecrease = (data: any) => {
    removeItem(data._id, true);
  };

  const handleAddToBasket = (data: any, e: any) => {
    if (data.stock > 0) {
      // Check if the quantity in the basket is less than the available stock
      if (!addedItemCounts[data._id] || addedItemCounts[data._id] < data.stock) {
        addItem(data);
      }
    }
    setShowImage(true);
    setAddedItem(data);

    const flyImage = document.createElement('div');
    flyImage.classList.add(styles.flyImage);
    flyImage.style.backgroundImage = `url(${data.images[0]})`;
    document.body.appendChild(flyImage);

    const cardRect = e.currentTarget.parentElement.parentElement.getBoundingClientRect();

    animateFlyImage(flyImage, cardRect);
  };

  return (
    <div className={styles.card} key={data._id}>
      <div
        className={styles.cardImage}
        onClick={() => handleProductModal(data._id)}
        onKeyDown={() => handleProductModal(data._id)}
      >
        <Image src={data.images[0]} alt={data.name} width={216} height={216} />
        {showImage && addedItem?._id === data._id && (
          <div className={styles.flyImage}>
            <Image src={data.images[0]} alt={data.name} width={112} height={112} />
          </div>
        )}
      </div>
      <div className={styles.cardContent}>
        <span className={styles.cardPrice}>{data.price} kr</span>
        <p>{data.title}</p>

        {data.stock > 0 ? (
        !addedItemCounts[data._id] ? (
          <button className={styles.beforeButton} onClick={(e) => handleAddToBasket(data, e)}>
            <span>{addedItemCounts[data._id] || 'Add'}</span>
            <span>+</span>
          </button>
        ) : (
          <div className={styles.afterButton}>
            <button onClick={() => handleDecrease(data)}>-</button>
            <span>{addedItemCounts[data._id]}</span>
            <button onClick={(e) => handleAddToBasket(data, null)}>+</button>
          </div>
          )
        ) : (
          <button className={styles.beforeButton} disabled>
            Out of stock
          </button>
        )}

      </div>
    </div>
  );
};

export default ProductCard;