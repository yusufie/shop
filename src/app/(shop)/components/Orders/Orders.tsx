"use client";
import { useUserStore } from "@/stores/userStore";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import AuthModal from "@/app/(shop)/components/Modals/Authorization/AuthModal";
import styles from './orders.module.css'

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

const Orders: React.FC = () => {
    const userStore = useUserStore();
    const userId = userStore.user?._id;
    const accessToken = userStore.accessToken;
    const router = useRouter();

    const { data: orderData, error } = useSWR(
        userId
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/user/${userId}`
          : null,
        (url) => (url ? fetcher(url, accessToken) : null)
    );
      
    // Check if the user is logged in
    if (!userStore.isLoggedIn) {
        // Display AuthModal if the user is not logged in
        return <AuthModal onClose={() => router.push('/orders')} />;
    }
    
    if (error) return <div>failed to load</div>;
    // orderData will be undefined initially and will be updated once data is fetched
    if (!orderData) return <div>loading...</div>;
    
    console.log("Order data:", orderData);

  return (
    <section className={styles.orders}>

        <div className={styles.myOrders}>

            <h2>My Orders</h2>

            {orderData?.map((order: any) => (
                <div className={styles.ordersCard} key={order?._id}>

                    <div className={styles.cardHeader}>
                        <span className={styles.orderNumber}>{order?._id}</span>
                        <span className={styles.orderStatus}>{order?.status}</span>
                    </div>

                    <div className={styles.cardBody}>

                        <div className={styles.cardRow}>
                            <span>Order Date</span>
                            <span>:</span>
                            <span>
                                {new Date(order?.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <div className={styles.cardRow}>
                            <span>Delivery Time</span>
                            <span>:</span>
                            <span>{order?.deliverySchedule}</span>
                        </div>

                        <div className={styles.cardRow}>
                            <span>Amount</span>
                            <span>:</span>
                            <span>{order?.total}</span>
                        </div>

                        <div className={styles.cardRow}>
                            <span>Total Price</span>
                            <span>:</span>
                            <span>{order?.totalAfterDiscount}</span>
                        </div>

                    </div>

                </div>
            ))}

        </div>

        <div className={styles.orderDetails}>

            <div className={styles.detailsHeader}>
                <h3>Order Details - 20231105635099</h3>
                <div className={styles.eye}>
                    <Image src="/icons/eye-green.svg" alt="eye" width={20} height={20} />
                    <span>Details</span>
                </div>
            </div>

            <div className={styles.detailStatus}>

                <div className={styles.statusOrder}>
                    <p>Order Status :</p>
                    <span>Order Processing</span>
                </div>

                <div className={styles.statusPayment}>
                    <p>Payment Status :</p>
                    <span>Cash On Delivery</span>
                </div>

            </div>

            <div className={styles.detailsInfo}>

                <div className={styles.addressInfo}>

                    <div className={styles.addressShipping}>
                        <span>Shipping Address</span>
                        <p>2148 Straford Park, KY, Winchester, 40391, United States</p>
                    </div>

                    <div className={styles.addressBilling}>
                        <span>Billing Address</span>
                        <p>2231 Kidd Avenue, AK, Kipnuk, 99614, United States</p>
                    </div>

                </div>

                <div className={styles.calculateInfo}>
                    <div className={styles.calculateRow}>
                        <span>Sub Total</span>
                        <span>$2.20</span>
                    </div>
                    <div className={styles.calculateRow}>
                        <span>Discount</span>
                        <span>$0.00</span>
                    </div>
                    <div className={styles.calculateRow}>
                        <span>Delivery Fee</span>
                        <span>$50.00</span>
                    </div>
                    <div className={styles.calculateRow}>
                        <span>Tax</span>
                        <span>$0.04</span>
                    </div>
                    <div className={styles.calculateRow}>
                        <p className={styles.calculateTotal}>Total</p>
                        <p className={styles.calculateTotal}>$52.24</p>
                    </div>
                </div>

            </div>

            <div className={styles.detailsProgress}>

                <div className={styles.progressStep}>
                    Pending
                </div>
                <div className={styles.progressStep}>
                    Processing
                </div>
                <div className={styles.progressStep}>
                    At Local Facility
                </div>
                <div className={styles.progressStep}>
                    Out For Delivery
                </div>
                <div className={styles.progressStep}>
                    Completed
                </div>

            </div>

            <div className={styles.detailsItems}>
                Table
            </div>

        </div>

    </section>
  )
}

export default Orders