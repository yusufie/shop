"use client";
import Image from "next/image";
import useBasketStore from '@/stores/basketStore';
import useLikeStore from "@/stores/likeStore";
import styles from "./whishlist.module.css";

interface WhishlistProps {
  products: any;
}

const Whishlist: React.FC<WhishlistProps> = ({products}) => {

  const likedProducts = useLikeStore((state) => state.likedProducts);

  const getLikedProductDetails = (productId: string) => {
    return products.products.find((product:any) => product._id === productId);
  };

  const { removeLikedProduct } = useLikeStore(); // Get the function

  const handleRemove = (productId: string) => {
    removeLikedProduct(productId); // Call the function on click
  };

  const addItem = useBasketStore((state) => state.addItem);
  const addedItemCounts = useBasketStore((state) => state.addedItemCounts);
  const removeItem = useBasketStore((state) => state.removeItem);

  const handleAddToBasket = (data: any) => {
    if (data && (!addedItemCounts[data._id] || addedItemCounts[data._id] < data.stock)) {
      addItem(data);
    }
  };
  
  const handleDecrease = (data: any) => {
      removeItem(data._id, true);
  };

  return (
    <section className={styles.wishlist}>
      <div className={styles.wishlistHeader}>
        <h3>My Wishlists</h3>
      </div>

      {likedProducts?.map((productId) => (
        <div className={styles.wishlistBody} key={productId}>
          <div className={styles.itemsLeft}>
          <Image src={getLikedProductDetails(productId)?.images[0]}
              width={72}
              height={72}
              alt="image"
              className={styles.itemImage}
            />
            <div className={styles.itemInfos}>
              <h4 className={styles.itemName}>
              {getLikedProductDetails(productId)?.title}
              </h4>
              <p className={styles.itemShop}>Grand Bazaar</p>
              <div className={styles.itemStar}>
                <span>
                  {getLikedProductDetails(productId)?.ratingsQuantity}
                </span>
                <Image src={"/icons/star.svg"} alt="star" width={12} height={12} />
              </div>
            </div>
          </div>

          <div className={styles.itemsRight}>

            <span className={styles.itemsPrice}>
              {getLikedProductDetails(productId)?.price} kr
            </span>

            <div className={styles.itemsButtons}>

              {!addedItemCounts[productId] ? (
                <button className={styles.addButton}
                  onClick={() => handleAddToBasket(getLikedProductDetails(productId))} >
                  {addedItemCounts[productId] || 'Add To Cart'}
                </button>
              ) : (
                <div className={styles.afterButton}>
                  <button onClick={() => handleDecrease(getLikedProductDetails(productId))}>-</button>
                  <span>{addedItemCounts[productId]}</span>
                  <button onClick={() => handleAddToBasket(getLikedProductDetails(productId))}>+</button>
                </div>
              )}      

              <button className={styles.removeButton} onClick={() => handleRemove(productId)}>
                Remove
              </button>
            </div>

          </div>
        </div>
      ))}
    </section>
  );
};

export default Whishlist;