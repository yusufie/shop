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
            Orders2
        </div>

    </section>
  )
}

export default Orders