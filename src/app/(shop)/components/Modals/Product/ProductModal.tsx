"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./productmodal.module.css";
import useBasketStore from '@/stores/basketStore';
import ModalSlider from "@/app/(shop)/components/Sliders/Modal/ModalSlider";

interface ProductModalProps {
  handleProductModal: (id: number | null) => void;
  datas: any;
  selectedProductId: any;
}

const ProductModal: React.FC<ProductModalProps> = ({
  handleProductModal,
  datas,
  selectedProductId,
}) => {
  const addItem = useBasketStore((state) => state.addItem);
  const addedItemCounts = useBasketStore((state) => state.addedItemCounts);
  const removeItem = useBasketStore((state) => state.removeItem);

  const handleAddToBasket = (data: any) => {
    addItem(data);
  };

  const handleDecrease = (data: any) => {
    removeItem(data._id, true);
  };

  const selectedProduct = datas.data.find((product: any) => product._id === selectedProductId);
  if (!selectedProduct) return null;

  return (
    <article className={styles.productmodal}>

      <div className={styles.modalContent}>

        <div className={styles.modalTop}>

          <div className={styles.productImages}>
            <ModalSlider selectedProduct={selectedProduct} />
          </div>

          <div className={styles.modalinfo}>

            <button onClick={() => handleProductModal(null)} className={styles.modalClose}>x</button>

            <div className={styles.infoHeart}>
              
              <Link href={`/products/${selectedProductId}`}>
                <h2>{selectedProduct.title}</h2>
              </Link>

              <button className={styles.heartButton}>
                <Image src="/icons/heart.svg" alt="heart" width={21} height={21}/>
              </button>
              
            </div>

            <div className={styles.infoStar}>
              <span>2Pfund</span>
              <div className={styles.infoStarCount}>
                <span>4.5</span>
                <Image src={"/icons/star.svg"} alt="star" width={12} height={12}/>
              </div>
            </div>

            <div className={styles.infoDescription}>
              <p>{selectedProduct.description}</p>
            </div>

            <div className={styles.infoPrice}>
              <span>${selectedProduct.price}</span>
            </div>

            <div className={styles.infoCart}>
              {!addedItemCounts[selectedProductId] ? (
                <button className={styles.beforeButton} onClick={() => handleAddToBasket(selectedProduct)}>
                  {addedItemCounts[selectedProductId] || 'Add To Shopping Cart'}
                </button>
              ) : (
                <div className={styles.afterButton}>
                  <button onClick={() => handleDecrease(selectedProduct)}>-</button>
                  <span>{addedItemCounts[selectedProductId]}</span>
                  <button onClick={() => addItem(selectedProduct)}>+</button>
                </div>
              )}
              <span className={styles.available}>10 pieces available</span>
            </div>

            <div className={styles.infoTags}>
              <span>Categories</span>
              <button>Tags</button>
              <button>Tags</button>
            </div>

            <div className={styles.infoSeller}>
              <span>Sellers</span>
              <Link href="/">
                <p>Grocery Shop</p>
              </Link>
            </div>
            
          </div>

        </div>

        <div className={styles.modalMiddle} >
          <h4>Details</h4>
          <p>{selectedProduct.description}</p>
        </div>

        <div className={styles.modalBottom} >
          <h3>Related Products</h3>
        </div>

      </div>

    </article>
  );
};

export default ProductModal;
