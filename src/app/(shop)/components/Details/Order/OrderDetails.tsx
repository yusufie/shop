import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./OrderDetails.module.css";
import Bag from "@/app/assets/bag.png";


interface DetailsProps {
  selectedOrder: any;
}

const OrderDetails: React.FC<DetailsProps> = ({ selectedOrder }) => {
  
  return (
    <div className={styles.orderDetails}>
      {selectedOrder && (
        <>
          <div className={styles.detailsHeader}>
            <h3>Order Details: <span>{selectedOrder._id}</span> </h3>
            <div className={styles.eye}>
              <Image
                src="/icons/eye-green.svg"
                alt="eye" width={20} height={20}
              />
              <span>Details</span>
            </div>
          </div>

          <div className={styles.detailStatus}>
            <div className={styles.statusOrder}>
              <p>Order Status:</p>
              <span>{selectedOrder.status}</span>
            </div>

            <div className={styles.statusPayment}>
              <p>Payment Status:</p>
              <span>{selectedOrder.paymentMethod}</span>
            </div>
          </div>

          <div className={styles.detailsInfo}>
            <div className={styles.addressInfo}>
              <div className={styles.addressShipping}>
                <span>Shipping Address</span>
                <p>
                  {selectedOrder.shippingAddress.alias} &nbsp; | &nbsp;
                  {selectedOrder.shippingAddress.details} &nbsp;
                  {selectedOrder.shippingAddress.city} &nbsp;
                  {selectedOrder.shippingAddress.zipCode} &nbsp;
                  {selectedOrder.shippingAddress.country}
                </p>
              </div>

              <div className={styles.addressBilling}>
                <span>Billing Address</span>
                <p>
                  {selectedOrder.billingAddress.alias} &nbsp; | &nbsp;
                  {selectedOrder.billingAddress.details} &nbsp;
                  {selectedOrder.billingAddress.city} &nbsp;
                  {selectedOrder.billingAddress.zipCode} &nbsp;
                  {selectedOrder.billingAddress.country}
                </p>
              </div>
            </div>

            <div className={styles.calculateInfo}>
              <div className={styles.calculateRow}>
                <span>Sub Total</span>
                <span>{selectedOrder.total} kr</span>
              </div>
              <div className={styles.calculateRow}>
                <span>Discount</span>
                <span>{selectedOrder.discount} kr</span>
              </div>
              <div className={styles.calculateRow}>
                <span>Delivery Fee</span>
                <span>{selectedOrder.shippingPrice} kr</span>
              </div>
              <div className={styles.calculateRow}>
                <span>Tax</span>
                <span>{selectedOrder.taxPrice} kr</span>
              </div>
              <div className={styles.calculateRow}>
                <p className={styles.calculateTotal}>Total</p>
                <p className={styles.calculateTotal}>
                  {selectedOrder.totalAfterDiscount} kr
                </p>
              </div>
            </div>
          </div>

          <div className={styles.detailsItems}>
            <table className={styles.itemsTable}>
              <thead>
              <tr className={styles.itemsTableHeader}>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
              </thead>
              <tbody className={styles.itemsTableBody}>
              {selectedOrder?.products?.map((item:any) => (
                  <tr key={item?._id} className={styles.itemsTableData}>
                    <td className={styles.firstDataCell}>
                      <Image
                          src={(item?.product?.images && item.product.images[0]) ? item.product.images[0] : Bag} // Updated check for valid image
                          alt={item?.product?.title || 'Product image'}
                          width={80} height={80}
                      />

                      <div className={styles.cellDiv}>
                        <Link href={`/products/${item?.product?._id}`}>
            <span className={styles.cellDivTitle}>
              {item?.product?.title}
            </span>
                        </Link>
                        <span className={styles.cellDivPrice}>
            {item?.product?.price} kr
          </span>
                      </div>
                    </td>

                    <td>{item?.quantity}</td>
                    <td>{item?.price} kr</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
