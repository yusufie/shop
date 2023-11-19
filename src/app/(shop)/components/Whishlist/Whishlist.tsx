import Image from "next/image";
import items from "../../../../../public/datas/grocery.json";
import styles from "./whishlist.module.css";

const Whishlist: React.FC = () => {

  return (
    <section className={styles.wishlist}>
      <div className={styles.wishlistHeader}>
        <h3>My Wishlists</h3>
      </div>

      {items.map((item) => (
        <div className={styles.wishlistBody} key={item._id}>
          <div className={styles.itemsLeft}>
            <Image src={item.image} width={72} height={72} alt="image"
              className={styles.itemImage}
            />
            <div className={styles.itemInfos}>
              <h4 className={styles.itemName}>{item.name}</h4>
              <p className={styles.itemShop}>{item.shop}</p>
              <div className={styles.itemStar}>
                <span>{item.rating}</span>
                <Image src={"/icons/star.svg"} alt="star" width={12} height={12} />
              </div>
            </div>
          </div>

          <div className={styles.itemsRight}>
            <span className={styles.itemsPrice}>{`$${item.price}`}</span>
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