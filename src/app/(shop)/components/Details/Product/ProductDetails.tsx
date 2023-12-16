"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import useBasketStore from '@/stores/basketStore';
import useLikeStore from "@/stores/likeStore";
import styles from "./productdetails.module.css";
import DetailSlider from "../../Sliders/Detail/DetailSlider";
import ProductCard from "@/app/(shop)/components/Cards/Product/ProductCard";
import ProductModal from '@/app/(shop)/components/Modals/Product/ProductModal';

interface ProductDetailsProps {
    products: any;
    categories: any;
}

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const ProductDetails: React.FC<ProductDetailsProps> = ({products, categories }) => {

    const { id } = useParams();
    const { data: responseData, error } = useSWR(process.env.NEXT_PUBLIC_API_URL+`/api/v1/products/${id}`, fetcher);

    const toggleLikeProduct = useLikeStore((state) => state.toggleLikeProduct);
    const likedProducts = useLikeStore((state) => state.likedProducts);
  
    const handleLikeProduct = (productId: string) => {
      toggleLikeProduct(productId);
    };

    const addItem = useBasketStore((state) => state.addItem);
    const addedItemCounts = useBasketStore((state) => state.addedItemCounts);
    const removeItem = useBasketStore((state) => state.removeItem);

    const handleAddToBasket = (data: any) => {
        // Check if the product exists and added quantity is less than available stock
        if (selectedProduct && (!addedItemCounts[selectedProductId] || addedItemCounts[selectedProductId] < selectedProduct.stock)) {
          addItem(data);
        }
      };
    
    const handleDecrease = (data: any) => {
        removeItem(data._id, true);
    };

    const [isProductModalVisible, setIsProductModalVisible] = useState(false);
    const [productId, setProductId] = useState<number | null>(null);

    const handleProductModal = (id: number | null) => {
        setProductId(id);
        setIsProductModalVisible(true);
    };

    const selectedProductId = responseData?._id;
    const selectedProduct = responseData;

    if (error) return <div>failed to load</div>;
    if (!responseData) return <div>loading...</div>;

    // Find the selected product's category object from the categories array
    const selectedProductCategory = categories?.categories?.find((category:any) => 
        category?._id === selectedProduct?.category?._id
    );

  // Find the parent category of the selected product's category
  const parentCategory = categories?.categories?.find((category: any) => 
    category?._id === selectedProductCategory?.parent?._id
  );

    // Extract the category ID from the selectedProduct
    const selectedProductCategoryId = selectedProduct.category._id;

    // Filter products based on the selectedProduct's category ID
    const relatedProducts = products.products.filter((product: any) => {
        // Extract the category ID from the product
        const productCategoryId = product.category?._id;
        // Check if the product's category matches the selectedProduct's category
        return productCategoryId === selectedProductCategoryId;
    });

  return (
    <section className={styles.productdetails}>

        <div className={styles.detailsContent}>

            <div className={styles.detailsTop}>

                <div className={styles.productImages}>
                    <div className={styles.back}>
                        <Link href={"/"}>
                            <Image src="/icons/arrow-back.png" alt="back" width={32} height={32}/>
                            Back
                        </Link>
                        <span className={styles.discount}>{responseData.discount}%</span>
                    </div>
                    <DetailSlider responseData={responseData} />
                </div>

                <div className={styles.productinfo}>

                    <div className={styles.infoHeart}>

                        <h2>{responseData.title}</h2>

                        <button className={styles.heartButton} onClick={() => handleLikeProduct(selectedProductId)}>
                            <Image 
                            src={likedProducts.includes(selectedProductId) ? '/icons/heart-filled.svg' : '/icons/heart.svg'} 
                            alt="heart" 
                            width={21} height={21}/>
                        </button>

                    </div>

                    <div className={styles.infoDescription}>
                        <p>{responseData.description}</p>
                    </div>

                    <div className={styles.infoPrice}>
                        <span>${responseData.price}</span>
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
                            <button onClick={() => handleAddToBasket(selectedProduct)}>+</button>
                            </div>
                        )}
                        <span className={styles.available}>{selectedProduct?.stock} pieces available</span>
                    </div>

                    <div className={styles.infoTags}>
                        <span>Categories</span>
                        <button>{selectedProductCategory?.title}</button>
                        {parentCategory && <button>{parentCategory?.title}</button>}
                    </div>

                    <div className={styles.infoSeller}>
                        <span>Sellers</span>
                        <Link href="/">
                            <p>Grand Bazaar</p>
                        </Link>
                    </div>

                </div>

            </div>

            <div className={styles.detailsMiddle} >
                <h4>Details</h4>
                <p>{responseData.description}</p>
            </div>    

            <div className={styles.detailsBottom} >
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

            {/* Conditionally render the ProductModal */}
            {isProductModalVisible && (
                <ProductModal
                    datas={products}
                    handleProductModal={handleProductModal}
                    selectedProductId={productId}
                    categories={categories}
                />
            )}

        </div>
    </section>
  );
};

export default ProductDetails;
