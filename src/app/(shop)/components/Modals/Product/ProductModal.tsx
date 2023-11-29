"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./productmodal.module.css";
import useBasketStore from '@/stores/basketStore';
import ModalSlider from "@/app/(shop)/components/Sliders/Modal/ModalSlider";
import ProductCard from "@/app/(shop)/components/Cards/Product/ProductCard";

interface ProductModalProps {
  handleProductModal: (id: number | null) => void;
  datas: any;
  selectedProductId: any;
  categories: any;
  subCategories: any;
}

const ProductModal: React.FC<ProductModalProps> = ({
  handleProductModal,
  datas,
  selectedProductId,
  categories,
  subCategories,
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

  const selectedProduct = datas.products.find((product: any) => product._id === selectedProductId);
  if (!selectedProduct) return null;

  // Filter same category as the selectedProduct
  const relatedProducts = datas.products.filter((product: any) =>
      JSON.stringify(product.category) === JSON.stringify(selectedProduct.category) &&
      product._id !== selectedProductId // Exclude the selected product
  );

  // Find the selected product's category object from the categories array
  const selectedProductCategory = categories.categories.find(
    (category:any) => category._id === selectedProduct.category._id
  );

  // Find the selected product's subcategory object from the categories array
  const selectedProductSubcategory = subCategories.subCategories.find(
    (subcategory:any) => subcategory._id === selectedProduct.subcategories[0]
  );

  return (
    <article className={styles.productmodal}>

      <div className={styles.modalContent}>

        <button onClick={() => handleProductModal(null)} className={styles.modalClose}>x</button>
        <div className={styles.modalTop}>

          <div className={styles.productImages}>
            <span className={styles.discount}>{selectedProduct.discount}%</span>
            <ModalSlider selectedProduct={selectedProduct} />
          </div>

          <div className={styles.modalinfo}>


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
                <span>{selectedProduct.ratingsQuantity}</span>
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
              <span className={styles.available}>{selectedProduct.stock} pieces available</span>
            </div>

            <div className={styles.infoTags}>
              <span>Categories</span>
              <button>{selectedProductCategory?.title}</button>
              <button>{selectedProductSubcategory?.title}</button>
            </div>

            <div className={styles.infoSeller}>
              <span>Sellers</span>
              <Link href="/">
                <p>Grand Bazaar</p>
              </Link>
            </div>
            
          </div>

        </div>

        <div className={styles.modalMiddle} >
          <h4>Details</h4>
          <p>{selectedProduct.description}</p>
        </div>

        <div className={styles.modalBottom} >
          <h4>Related Products</h4>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((product:any) => (
              <ProductCard
                key={product._id}
                data={product}
                handleProductModal={handleProductModal}
              />
            ))}
          </div>
        </div>

      </div>

    </article>
  );
};

export default ProductModal;
