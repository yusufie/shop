"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { useUserStore } from "@/stores/userStore";
import useBasketStore from '@/stores/basketStore';
import useLikeStore from "@/stores/likeStore";

import AuthModal from "@/app/(shop)/components/Modals/Authorization/AuthModal";
import CardLoading from "@/app/(shop)/components/Modals/Loading/CardLoading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./whishlist.module.css";


const fetcher = async (url: string, accessToken: string | null) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  return res.json();
};

const Whishlist: React.FC = () => {

  const userStore = useUserStore();
  const userId = userStore.user?._id;
  const accessToken = userStore.accessToken;
  const router = useRouter();

  const addItem = useBasketStore((state) => state.addItem);
  const addedItemCounts = useBasketStore((state) => state.addedItemCounts);
  const removeItem = useBasketStore((state) => state.removeItem);
  const { removeLikedProduct } = useLikeStore();

  const { data: userData, error: userError } = useSWR(
    userId
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}`
      : null,
    (url) => (url ? fetcher(url, accessToken) : null)
  );

  const likedProducts = userData?.wishlist || [];

  // Fetch individual product details for each product in the wishlist
  const { data: productData, error: productError } = useSWR(
    likedProducts?.map((productId: string) => `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/${productId}`),
    (urls:any) => Promise.all(urls.map((url:any) => fetcher(url, accessToken)))
  );
  
  // Check if the user is logged in
  if (!userStore.isLoggedIn) {
    // Display AuthModal if the user is not logged in
    return <AuthModal onClose={() => router.push('/wishlists')} />;
  }

  const handleRemove = async (productId: string) => {
    if (!userStore?.user?._id) {
      toast.info('Please login to add products to your wishlist');
      return;
    }

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/wishlist/remove/${userStore?.user?._id}`;

      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${userStore?.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        const responseData = await response.json();
        // console.log('Response Data:', responseData.message);
        toast.success(responseData.message);
        removeLikedProduct(productId);
      } else {
        console.error('Failed to update wishlist');
        toast.error('Failed to update wishlist');
      }
      // to update the data after removing the product from wishlist
      mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}`)

    } catch (error) {
      console.error('Error occurred while updating wishlist:', error);
      toast.error('Error occurred while updating wishlist');
    }
  };

  const handleAddToBasket = (data: any) => {
    if (data.stock > 0) {
      // Check if the quantity in the basket is less than the available stock
      if (data && (!addedItemCounts[data._id] || addedItemCounts[data._id] < data.stock)) {
        addItem(data);
      }
    }
  };
  
  const handleDecrease = (data: any) => {
      removeItem(data._id, true);
  };

  if (userError || productError) return <section className={styles.wishlist}>failed to load</section>;
  // userData will be undefined initially and will be updated once data is fetched
  if (!userData || !productData) return <CardLoading/>;

  return (
    <>
    <section className={styles.wishlist}>
      <div className={styles.wishlistHeader}>
        <h3>My Wishlists</h3>
      </div>

      {productData?.map((product: any) => (
        <div className={styles.wishlistBody} key={product._id}>

          <div className={styles.itemsLeft}>
            <Image src={product?.images[0]}
              width={72} height={72} alt="image"
              className={styles.itemImage}
            />
            <div className={styles.itemInfos}>

              <Link href={`/products/${product?.slug}`} passHref>
                <h4 className={styles.itemName}>{product?.title}</h4>
              </Link>

              <p className={styles.itemShop}>Grand Bazaar</p>

              <div className={styles.itemStar}>
                <span>
                  {product?.ratingsQuantity}
                </span>
                <Image src={"/icons/star.svg"} alt="star" width={12} height={12} />
              </div>
              
            </div>
          </div>

          <div className={styles.itemsRight}>

            <span className={styles.itemsPrice}>
              {product?.price} kr
            </span>

            <div className={styles.itemsButtons}>
              {product?.stock > 0 ? (
              !addedItemCounts[product._id] ? (
                <button className={styles.addButton}
                  onClick={() => handleAddToBasket(product)} >
                  {addedItemCounts[product._id] || 'Add To Cart'}
                </button>
              ) : (
                <div className={styles.afterButton}>
                  <button onClick={() => handleDecrease(product)}>-</button>
                  <span>{addedItemCounts[product._id]}</span>
                  <button onClick={() => handleAddToBasket(product)}>+</button>
                </div>
              )
              ) : (
                <button className={styles.addButton} disabled>
                  Out of Stock
                </button>
              )
            }

              <button className={styles.removeButton} onClick={() => handleRemove(product._id)}>
                Remove
              </button>
            </div>

          </div>
        </div>
      ))}
    </section>
    <ToastContainer />
    </>
  );
};

export default Whishlist;