import Image from 'next/image'
import styles from './checkout.module.css'

const Checkout: React.FC = ({}) => {
  return (
    <section className={styles.checkout}>

        <div className={styles.checkoutInfo}>

            <div className={styles.contact}>
                <div className={styles.contactHeader}>
                    <div>
                        <span className={styles.serial}>1</span>
                        <span className={styles.title}>Contact Number</span>
                    </div>
                    
                    <button className={styles.updateButton}>+ Update</button>
                </div>
                <div className={styles.contactInput}>
                    <input type="text" placeholder="Enter your contact number" />
                </div>
            </div>

            <div className={styles.billing}>
                <div className={styles.billingHeader}>
                    <div>
                        <span className={styles.serial}>2</span>
                        <span className={styles.title}>Billing Address</span>
                    </div>
                    <button className={styles.updateButton}>+ Add</button>
                </div>
                <div className={styles.billingInput}>
                    <div className={styles.inputTop}>
                        <h4>Billing</h4>
                        <div className={styles.hoverButtons}>
                            <button className={styles.hoverPen}>
                                <Image src="/icons/pen.svg" alt="pen" width={16} height={16} />
                            </button>
                            <button className={styles.hoverCross}>
                                <Image src="/icons/cross.svg" alt="cross" width={16} height={16} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.inputBottom}>
                        <p>2231 Kidd Avenue, AK, Kipnuk, 99614, United States</p>
                    </div>
                </div>
            </div>

            <div className={styles.shipping}>
                <div className={styles.shippingHeader}>
                    <div>
                        <span className={styles.serial}>3</span>
                        <span className={styles.title}>Shipping Address</span>
                    </div>
                    
                    <button className={styles.updateButton}>+ Add</button>
                </div>

                <div className={styles.shippingInput}>
                    <div className={styles.inputTop}>
                        <h4>Shipping</h4>
                        <div className={styles.hoverButtons}>
                            <button className={styles.hoverPen}>
                                <Image src="/icons/pen.svg" alt="pen" width={16} height={16} />
                            </button>
                            <button className={styles.hoverCross}>
                                <Image src="/icons/cross.svg" alt="cross" width={16} height={16} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.inputBottom}>
                        <p>2231 Kidd Avenue, AK, Kipnuk, 99614, United States</p>
                    </div>
                </div>
            </div>

            <div className={styles.delivery}>

                <div className={styles.deliveryHeader}>
                    <div>
                        <span className={styles.serial}>4</span>
                        <span className={styles.title}>Delivery Schedule</span>
                    </div>
                </div>

                <div className={styles.deliveryInput}>

                    <button>
                        <h4>Express Delivery</h4>
                        <span>90 min express delivery</span> 
                    </button>

                    <button>
                        <h4>Morning</h4>
                        <span>8.00 AM - 11.00 AM</span>
                    </button>

                    <button>
                        <h4>Noon</h4>
                        <span>11.00 AM - 2.00 PM</span>
                    </button>

                    <button>
                        <h4>Afternoon</h4>
                        <span>2.00 PM - 5.00 PM</span>
                    </button>

                    <button>
                        <h4>Evening</h4>
                        <span>5.00 PM - 8.00 PM</span>
                    </button>
                </div>

            </div>

            <div className={styles.note}>

                <div className={styles.noteHeader}>
                    <div>
                        <span className={styles.serial}>5</span>
                        <span className={styles.title}>Order Note</span>
                    </div>
                </div>

                <div className={styles.noteInput}>
                    <textarea rows={8} placeholder="Write your order note here...">
                    </textarea>
                </div>

            </div>

        </div>

        <div className={styles.checkoutCalculate}>
            <div className={styles.order}>Your Order</div>
            <div className={styles.items}>Items</div>
            <div className={styles.subtotal}>Subtotal</div>
            <button>Check Availability</button>
        </div>

    </section>
  )
}

export default Checkout