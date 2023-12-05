import Image from 'next/image'
import orders from '../../../../../public/datas/order.json'
import styles from './orders.module.css'

const Orders: React.FC = () => {

  return (
    <section className={styles.orders}>

        <div className={styles.myOrders}>

            <h2>My Orders</h2>
            
            {orders.map((order) => (
                <div className={styles.ordersCard} key={order._id}>

                    <div className={styles.cardHeader}>
                        <span className={styles.orderNumber}>{order.orderNumber}</span>
                        <span className={styles.orderStatus}>{order.status}</span>
                    </div>

                    <div className={styles.cardBody}>

                        <div className={styles.cardRow}>
                            <span>Order Date</span>
                            <span>:</span>
                            <span>{order.orderDate}</span>
                        </div>

                        <div className={styles.cardRow}>
                            <span>Delivery Time</span>
                            <span>:</span>
                            <span>{order.deliveryTime}</span>
                        </div>

                        <div className={styles.cardRow}>
                            <span>Amount</span>
                            <span>:</span>
                            <span>{order.amount}</span>
                        </div>

                        <div className={styles.cardRow}>
                            <span>Total Price</span>
                            <span>:</span>
                            <span>{order.totalPrice}</span>
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