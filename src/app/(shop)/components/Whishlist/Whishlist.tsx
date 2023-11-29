"use client";
import Image from "next/image";
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
              ${getLikedProductDetails(productId)?.price}
            </span>

            <div className={styles.itemsButtons}>
              <button className={styles.addButton}>Add to Cart</button>
              <button className={styles.removeButton}>Remove</button>
            </div>

          </div>
        </div>
      ))}
    </section>
  );
};

export default Whishlist;