"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { useUserStore } from '@/stores/userStore';
import useBasketStore from '@/stores/basketStore';
import useLikeStore from "@/stores/likeStore";

import DetailSlider from "../../Sliders/Detail/DetailSlider";
import ProductCard from "@/app/(shop)/components/Cards/Product/ProductCard";
import ProductModal from '@/app/(shop)/components/Modals/Product/ProductModal';
import LoadingModal from "@/app/(shop)/components/Modals/Loading/LoadingModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./productdetails.module.css";

interface ProductDetailsProps {
    products: any;
    categories: any;
}

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const ProductDetails: React.FC<ProductDetailsProps> = ({products, categories }) => {

    const { id } = useParams();
    const { data: responseData, error: productError } = useSWR(process.env.NEXT_PUBLIC_API_URL+`/api/v1/products/${id}`, fetcher);
    const { data: relatedProducts, error: relatedError } = useSWR(process.env.NEXT_PUBLIC_API_URL+`/api/v1/products/related/${id}`, fetcher);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const userStore = useUserStore();
    const toggleLikeProduct = useLikeStore((state) => state.toggleLikeProduct);
    const likedProducts = useLikeStore((state) => state.likedProducts);
  
    const handleLikeProduct = async (productId: string) => {
        // Check if the user is logged in
        if (!userStore?.user?._id || !userStore?.accessToken) {
          toast.info('Please login to add products to your wishlist');
          return;
        }
    
        try {
            setIsSubmitting(true);
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/wishlist/toggle/${userStore.user?._id}`;
    
          const response = await fetch(apiUrl, {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${userStore.accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }),
          });
    
          if (response.ok) {
            const responseData = await response.json();
            // console.log('Response Data:', responseData.message);
            toast.success(responseData.message);
            toggleLikeProduct(productId);
          } else {
            console.error('Failed to update wishlist');
            toast.error('Failed to update wishlist');
          }
    
        } catch (error) {
          console.error('Error occurred while updating wishlist:', error);
          toast.error('Error occurred while updating wishlist');
        } finally {
            setIsSubmitting(false); // Re-enable submit button
        }
    };

    const addItem = useBasketStore((state) => state.addItem);
    const addedItemCounts = useBasketStore((state) => state.addedItemCounts);
    const removeItem = useBasketStore((state) => state.removeItem);

    const handleAddToBasket = (data: any) => {
        if (selectedProduct.stock > 0) {
        // Check if the product exists and added quantity is less than available stock
        if (selectedProduct && (!addedItemCounts[selectedProductId] || addedItemCounts[selectedProductId] < selectedProduct.stock)) {
          addItem(data);
        }
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

    if (productError) return <div>failed to load</div>;
    if (!responseData) return <LoadingModal />;

    if (relatedError) return <div>failed to load</div>;
    if (!relatedProducts) return <LoadingModal />;

    // Find the selected product's category object from the categories array
    const selectedProductCategory = categories?.categories?.find((category:any) => 
        category?._id === selectedProduct?.category?._id
    );

  // Find the parent category of the selected product's category
  const parentCategory = categories?.categories?.find((category: any) => 
    category?._id === selectedProductCategory?.parent?._id
  );

  return (
    <>
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

                        <button onClick={() => handleLikeProduct(selectedProductId)} disabled={isSubmitting}
                            className={`${styles.heartButton} ${isSubmitting ? styles.loading : ''}`}>

                            {isSubmitting ? (
                                <>
                                <span className={styles.spinner} /> {/* spinner */}
                                </>
                            ) : (
                                <Image 
                                src={likedProducts.includes(selectedProductId) ? '/icons/heart-filled.svg' : '/icons/heart.svg'} 
                                alt="heart" width={21} height={21}/>
                            )}
                        </button>

                    </div>

                    <div className={styles.infoDescription}>
                        <p>{responseData.description}</p>
                    </div>

                    <div className={styles.infoPrice}>
                        <span>{responseData.price} kr </span>
                    </div>

                    <div className={styles.infoCart}>
                        {selectedProduct.stock > 0 ? (
                        !addedItemCounts[selectedProductId] ? (
                            <button className={styles.beforeButton} onClick={() => handleAddToBasket(selectedProduct)}>
                            {addedItemCounts[selectedProductId] || 'Add To Shopping Cart'}
                            </button>
                        ) : (
                            <div className={styles.afterButton}>
                            <button onClick={() => handleDecrease(selectedProduct)}>-</button>
                            <span>{addedItemCounts[selectedProductId]}</span>
                            <button onClick={() => handleAddToBasket(selectedProduct)}>+</button>
                            </div>
                        )
                        ) : (
                            <button className={styles.beforeButton} disabled>
                            Out of Stock
                            </button>
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
                    {/* if there is no related products do not render the ProductCard */}
                    {relatedProducts?.length > 0 && relatedProducts?.map((product:any) => (
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
    <ToastContainer />
    </>
  );
};

export default ProductDetails;
