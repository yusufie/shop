"use client";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import useBasketStore from '@/stores/basketStore';
import styles from "./productdetails.module.css";
import DetailSlider from "../../Sliders/Detail/DetailSlider";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const ProductDetails = () => {

    const { id } = useParams();
    const { data: responseData, error } = useSWR(`https://ecommerce-api-5ksa.onrender.com/api/v1/products/${id}`, fetcher);

    const addItem = useBasketStore((state) => state.addItem);
    const addedItemCounts = useBasketStore((state) => state.addedItemCounts);
    const removeItem = useBasketStore((state) => state.removeItem);

    const handleAddToBasket = (data: any) => {
        addItem(data);
    };
    
    const handleDecrease = (data: any) => {
        removeItem(data._id, true);
    };

    const selectedProductId = responseData?._id;
    const selectedProduct = responseData;

    if (error) return <div>failed to load</div>;
    if (!responseData) return <div>loading...</div>;
    // console.log(responseData);

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
                        <span className={styles.discount}>20%</span>
                    </div>
                    <DetailSlider responseData={responseData} />
                </div>

                <div className={styles.productinfo}>

                    <div className={styles.infoHeart}>
                        <h2>{responseData.title}</h2>
                        <button className={styles.heartButton}>
                            <Image src="/icons/heart.svg" alt="heart" width={21} height={21}/>
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

            <div className={styles.detailsMiddle} >
                <h4>Details</h4>
                <p>{responseData.description}</p>
            </div>

            <div className={styles.detailsRating} >
                <h4>Rating</h4>
                <p>Rating</p>
            </div>        

            <div className={styles.detailsBottom} >
                <h3>Related Products</h3>
            </div>

        </div>
    </section>
  );
};

export default ProductDetails;
