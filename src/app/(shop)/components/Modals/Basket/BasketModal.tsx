import useBasketStore from "@/stores/basketStore";
import Image from "next/image";
import Link from "next/link";
import styles from "./basketmodal.module.css";
import Bag from "@/app/assets/bag.png";

interface BasketModalProps {
  onClose: () => void;
}

const BasketModal: React.FC<BasketModalProps> = ({ onClose }) => {
  const items = useBasketStore((state) => state.items);
  const addedItemCounts = useBasketStore((state) => state.addedItemCounts);
  const removeItem = useBasketStore((state) => state.removeItem);
  const addItem = useBasketStore((state) => state.addItem);

  const handleDecrease = (item: any) => {
    if (addedItemCounts[item._id] > 1) {
      removeItem(item._id, true);
    } else {
      removeItem(item._id, false);
    }
  };

  const handleAddToBasket = (item: any) => {
    // Check if the quantity in the basket is less than the available stock
    if (!addedItemCounts[item._id] || addedItemCounts[item._id] < item.stock) {
      addItem(item);
    }
  };

  const totalPrice = items.reduce((total, item) => 
    total + (item.price * (addedItemCounts[item._id] || 0)), 0).toFixed(2);

  return (
    <section className={`${styles.basketmodal} ${styles.open}`}>

        <div className={styles.modalHeader}>
          <div className={styles.bagCount}>
            <Image src="/images/bag.png" alt="Bag" width={17} height={22} />
            <span>{items.length} Item</span>
          </div>
          <button className={styles.closeButton} onClick={onClose}>x</button>
        </div>

        <div className={styles.modalBody}>
        {items.length === 0 ? (
            <div className={styles.emptyBag}>
              <Image src="/images/carrier.png" alt="carrier" width={140} height={176} />
              <span>No products found</span>
            </div>
          ) : (
            items.map((item) => (
              <div className={styles.basketItem} key={item._id}>
                <div className={styles.basketItemLeft}>
                  <div className={styles.basketItemQuantity}>
                  <button
                    className={styles.basketItemQuantityButton}
                    onClick={() => handleAddToBasket(item)}
                    disabled={Boolean(addedItemCounts[item._id] && addedItemCounts[item._id] >= item.stock)}
                  >
                    <Image src={"/icons/plus.svg"} alt="plus" width={10} height={10} />
                  </button>

                    <span className={styles.basketItemQuantityValue}>{addedItemCounts[item._id]}</span>

                    <button className={styles.basketItemQuantityButton} onClick={() => handleDecrease(item)}>
                      <Image src="/icons/minus.svg" alt="minus" width={10} height={10} />
                    </button>
                  </div>

                    <div className={styles.basketItemImage}>
                        <Image
                            src={(item.images && item.images[0]) ? item.images[0] : Bag} // Check if item.images[0] is truthy
                            alt={item.name || "Product image"}
                            width={80}
                            height={80}
                        />
                    </div>

                    <div className={styles.basketItemDetails}>
                        <p className={styles.basketItemName}>{item.name}</p>
                        <span className={styles.basketItemPrice}>{item.price} kr </span>
                    </div>
                </div>

                  <div className={styles.basketItemRight}>

                  <div className={styles.basketItemTotal}>
                    <span className={styles.basketItemTotalPrice}>
                      {item.price * addedItemCounts[item._id]} kr
                    </span>
                  </div>
                  
                  <button className={styles.deleteButton} onClick={() => removeItem(item._id, false)} >
                    <span>x</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.modalFooter}>
            <Link href="/checkout">
            <button className={styles.checkoutButton}>
              <span>Checkout</span>
              <span className={styles.checkoutPrice}>{totalPrice} kr </span>
            </button>
          </Link>
        </div>
        
    </section>
  );
};

export default BasketModal;
