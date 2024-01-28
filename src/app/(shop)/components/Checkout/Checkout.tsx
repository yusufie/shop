"use client";
import Image from "next/image";
import styles from "./checkout.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import ShipUpdateModal from "../Modals/Checkout/ShippingAdress/ShipUpdateModal";
import ShipDeleteModal from "../Modals/Checkout/ShippingAdress/ShipDeleteModal";
import useBasketStore from "@/stores/basketStore";
import useNoteStore from "@/stores/noteStore";
import useDeliveryStore from "@/stores/deliveryStore";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import LoadingModal from "@/app/(shop)/components/Modals/Loading/LoadingModal";
import BillDeleteModal from "@/app/(shop)/components/Modals/Checkout/BillingAdresss/BillDeleteModal";
import BillUpdateModal from "@/app/(shop)/components/Modals/Checkout/BillingAdresss/BillUpdateModal";
import UpdateContact from "./UpdateContact";
import AuthModal from "@/app/(shop)/components/Modals/Authorization/AuthModal";
import Bag from "@/app/assets/bag.png";


interface User {
  _id: string;
}

const Checkout: React.FC = () => {
  // AÇMA KAPAMA STATELERİ
  const [isBillAddModalOpen, setIsBillAddModalOpen] = useState(false);
  const [isShipAddModalOpen, setIsShipAddModalOpen] = useState(false);
  const [isBillUpdateModalOpen, setIsBillUpdateModalOpen] = useState(false);
  const [isBillDeleteModalOpen, setIsBillDeleteModalOpen] = useState(false);
  const [isShipUpdateModalOpen, setIsShipUpdateModalOpen] = useState(false);
  const [isShipDeleteModalOpen, setIsShipDeleteModalOpen] = useState(false);
  const [contactItem, setContactItem] = useState();

  // ZUSTAND STORELAR
  const product = useBasketStore((state) => state.items);
  const addedItemCounts = useBasketStore((state) => state.addedItemCounts);
  const { selectedButtons, handleButtonClick } = useDeliveryStore();
  const { orderNote, setOrderNote } = useNoteStore();
  const noteData = useNoteStore((state) => state);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const { user } = useUserStore();
  const userStore = useUserStore();
  const router = useRouter();
  const [userId, setUserId] = useState<string | undefined>();

  const deliverySchedule = useDeliveryStore((state) =>
    state.getDeliverySchedule()
  );


  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData: User = JSON.parse(userString);
      setUserId(userData._id);
    }
    // console.log("Delivery schedule updated:", deliverySchedule);
  }, [deliverySchedule]);

  const {
    data: datas,
    error,
    mutate,
  } = useSWR(
    process.env.NEXT_PUBLIC_API_URL + `/api/v1/users/${userId}  `,
    async (url) => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      return response.json();
    }
  );

  // Check if the user is logged in
  if (!userStore.isLoggedIn) {
    // Display AuthModal if the user is not logged in
    return <AuthModal onClose={() => router.push("/checkout")} />;
  }

  if (error) return <div>Loading failed</div>;
  if (!datas) return <LoadingModal />;
  mutate(datas);

  // Use filter with the correct type for item
  const userMatches = datas;

  const addressIdsTo =
    userMatches.addresses?.map((address: any) => address) || [];

  // console.log(addressIdsTo[0].alias);

  // slice  the userMaches addresses array to get the first item
  const firstAddress = userMatches.addresses.slice(0, 1);
  // *!!---------------GET PRODUCTS------------------------!*
  // const products = product.map((item) => ({
  // product: item._id,
  // addedItemCounts: addedItemCounts[item._id],
  // }));
  // console.log(products);

  //  Warn if addedItemCounts is greater than stock according to current stock status
  // const fetchApi = async () => {
  // const accessToken = localStorage.getItem("accessToken");
  // if (!accessToken) {
  // throw new Error("Access token not found");
  // }

  // try {
  // // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/${product[0]._id}`,
  // {
  // method: "GET",
  // headers: {
  // Authorization: `Bearer ${accessToken}`,
  // },
  // }
  // );

  // if (!response.ok) {
  // throw new Error(`HTTP error! Status: ${response.status}`);
  // }

  // const responseData = await response.json();
  // setResponseData(responseData);
  // console.log("Product data:", responseData);
  // } catch (error) {
  // console.error("Error fetching product:", error.message);
  // Handle the error
  // }

  // }
  // fetchApi()
  //

  // *!!!111!------------------------------POST FUNCTİON------------------!!!!*

  const handleCheckout = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/v1/orders";
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const orderData = {
      user: user?._id,
      products: product.map((item) => ({
        product: item._id,
        quantity: addedItemCounts[item._id],
        price: item.price,
      })),

      coupon: null,
      discount: 0,
      contact:
          userMatches?.contact?.length > 0
              ? userMatches.contact.map((contactItem:any) => ({
                phone: contactItem.phone ? {
                  countryCode: contactItem?.phone.countryCode,
                  number: contactItem?.phone.number,
                } : null,
              }))
              : [],

      billingAddress: {
        alias: addressIdsTo[0].alias,
        details: addressIdsTo[0].details,
        city: addressIdsTo[0].city,
        postalCode: addressIdsTo[0].postalCode,
        country: addressIdsTo[0].country,
      },

      shippingAddress: {
        alias: addressIdsTo[0].alias,
        details: addressIdsTo[0].details,
        city: addressIdsTo[0].city,
        postalCode: addressIdsTo[0].postalCode,
        country: addressIdsTo[0].country,
      },

      deliverySchedule: deliverySchedule,
      orderNote: noteData.orderNote,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderData),
    };
    console.log(orderData);
    try {
      const response = await fetch(apiUrl, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      console.log("Order created successfully:", responseData);
      console.log(orderData);

      toast.success("Gratulations! Your order has been created successfully.");
    } catch (error: any) {
      console.error("Error creating order:", error.message);
      toast.error("An error occurred. Please try again.");
    }
  };

  // *!!!!---------------------------------HANDLE FUNCTİONLAR------------------------!!!!*

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNote = event.target.value;
    setOrderNote(newNote);
  };
  // AÇMA KAPAMA

  const handleBillUpdateClick = (_id: any, contactItem: any) => {
    setContactItem(contactItem);
    setIsBillUpdateModalOpen(true);
    setSelectedAddressId(contactItem._id);
    console.log(contactItem);
  };

  const handleShipUpdateClick = (_id: any, contactItem: any) => {
    setIsShipUpdateModalOpen(true);
    setSelectedAddressId(contactItem._id);
    setContactItem(contactItem);
  };

  const handleBillDeleteClick = (_id: any, contactItem: any) => {
    setIsBillDeleteModalOpen(true);
    setSelectedAddressId(contactItem._id);
  };

  const handleShipDeleteClick = (_id: any, contactItem: any) => {
    setIsShipDeleteModalOpen(true);
    setSelectedAddressId(contactItem._id);
  };

  const handleBillModalClose = () => {
    setIsBillUpdateModalOpen(false);
  };

  const handleShipModalClose = () => {
    setIsShipUpdateModalOpen(false);
  };
  const handleShipDeleteClose = () => {
    setIsShipDeleteModalOpen(false);
  };
  const handleBillDeleteClose = () => {
    setIsBillDeleteModalOpen(false);
  };

  const totalPrice = product
    .reduce(
      (total, product) =>
        total + product.price * (addedItemCounts[product._id] || 0),
      0
    )
    .toFixed(2);
  // get All products  discount and reduce discounts to get total discount
  const totalDiscount = product
    .map((dis: any) => dis.discount * (addedItemCounts[dis._id] || 0))
    .reduce((total, discount) => total + discount, 0)
    .toFixed(2);

  return (
    <>
      <section className={styles.checkout}>
        <div className={styles.checkoutInfo}>
          <UpdateContact userData={userMatches} />
          <div className={styles.billing}>
            <div className={styles.billingHeader}>
              <div>
                <span className={styles.serial}>2</span>
                <span className={styles.title}>Billing Address</span>
              </div>
            </div>
            <div className={styles.map}>
              <>
                {userMatches?.addresses?.length > 0 &&
                  firstAddress.map((contactItem: any, _id: any) => (
                    <div key={contactItem._id} className={styles.billingInput}>
                      <div className={styles.inputTop}>
                        <h4>Billing</h4>
                        <div className={styles.hoverButtons}>
                          <button
                            onClick={() =>
                              handleBillUpdateClick(_id, contactItem)
                            }
                            className={styles.hoverPen}
                          >
                            <Image
                              src="/icons/pen.svg"
                              alt="pen"
                              width={16}
                              height={16}
                            />
                          </button>
                          <button
                            onClick={() =>
                              handleBillDeleteClick(_id, contactItem)
                            }
                            className={styles.hoverCross}
                          >
                            <Image
                              src="/icons/cross.svg"
                              alt="cross"
                              width={16}
                              height={16}
                            />
                          </button>
                        </div>
                      </div>
                      <div className={styles.inputBottom}>
                        <div key={_id}>
                          <strong>Title:</strong> {contactItem.alias} <br />
                          <strong>Street Address:</strong> {contactItem.details}{" "}
                          <br />
                          <strong>City:</strong> {contactItem.city} <br />
                          <strong>Country:</strong> {contactItem.country} <br />
                          <strong>Postal Code:</strong> {contactItem.postalCode}{" "}
                          <br />
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            </div>
          </div>
          <div className={styles.shipping}>
            <div className={styles.shippingHeader}>
              <div>
                <span className={styles.serial}>3</span>
                <span className={styles.title}>Shiping Address</span>
              </div>
            </div>
            <div className={styles.map}>
              <>
                {userMatches?.addresses?.length > 0 &&
                  firstAddress.map((contactItem: any, _id: any) => (
                    <div className={styles.shippingInput} key={contactItem._id}>
                      <div className={styles.inputTop}>
                        <h4>Shipping</h4>
                        <div className={styles.hoverButtons}>
                          <button
                            onClick={() =>
                              handleShipUpdateClick(_id, contactItem)
                            }
                            className={styles.hoverPen}
                          >
                            <Image
                              src="/icons/pen.svg"
                              alt="pen"
                              width={16}
                              height={16}
                            />
                          </button>
                          <button
                            onClick={() =>
                              handleShipDeleteClick(_id, contactItem)
                            }
                            className={styles.hoverCross}
                          >
                            <Image
                              src="/icons/cross.svg"
                              alt="cross"
                              width={16}
                              height={16}
                            />
                          </button>
                        </div>
                      </div>
                      <div className={styles.inputBottom}>
                        <div key={_id}>
                          <strong>Title:</strong> {contactItem.alias}
                          <br />
                          <strong>Street Address:</strong> {contactItem.details}{" "}
                          <br />
                          <strong>City:</strong> {contactItem.city} <br />
                          <strong>Country:</strong> {contactItem.country} <br />
                          <strong>Postal Code:</strong> {contactItem.postalCode}{" "}
                          <br />
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            </div>
          </div>

          <div className={styles.delivery}>
            <div className={styles.deliveryHeader}>
              <div>
                <span className={styles.serial}>4</span>
                <span className={styles.title}>Delivery Schdule</span>
              </div>
            </div>
            <div className={styles.deliveryInput}>
              <button
                onClick={() => handleButtonClick("express")}
                className={
                  selectedButtons.express
                    ? styles.selectedButton
                    : styles.deliveryButton
                }
              >
                <h4>Express Delivery</h4>
                <span>90 min express delivery</span>
              </button>
              <button
                onClick={() => handleButtonClick("morning")}
                className={
                  selectedButtons.morning
                    ? styles.selectedButton
                    : styles.deliveryButton
                }
              >
                <h4>Morning</h4>
                <span>8.00 AM - 11.00 AM</span>
              </button>
              <button
                onClick={() => handleButtonClick("noon")}
                className={
                  selectedButtons.noon
                    ? styles.selectedButton
                    : styles.deliveryButton
                }
              >
                <h4>Noon</h4>
                <span>11.00 AM - 2.00 PM</span>
              </button>
              <button
                onClick={() => handleButtonClick("afternoon")}
                className={
                  selectedButtons.afternoon
                    ? styles.selectedButton
                    : styles.deliveryButton
                }
              >
                <h4>Afternoon</h4>
                <span>2.00 PM - 5.00 PM</span>
              </button>
              <button
                onClick={() => handleButtonClick("evening")}
                className={
                  selectedButtons.evening
                    ? styles.selectedButton
                    : styles.deliveryButton
                }
              >
                <h4>Evening</h4>
                <span>5.00 PM - 8.00 PM</span>
                <span className={styles.special}>
                  (Your order will be delivered the next day.)
                </span>
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
              <textarea
                rows={8}
                placeholder="Write Your Order Note Here...."
                value={orderNote}
                onChange={handleNoteChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.modalBody}>
            <h1 className={styles.modalTitle}>Your Order</h1>
            {product.length === 0 ? (
                <div className={styles.emptyBag}>
                  <Image
                      src="/images/carrier.png"
                      alt="carrier"
                      width={140}
                      height={176}
                  />
                  <span>No products found</span>
                </div>
            ) : (
                product.map((item: any) => (
                    <div className={styles.basketItems} key={item._id}>
                      <div className={styles.basketItemLefts}>
          <span className={styles.basketItemQuantityValue}>
            {addedItemCounts[item._id]} x
          </span>

                        <div className={styles.basketItemImage}>
                          <Image
                              src={item.images && item.images[0] ? item.images[0] : Bag} // Replace with your default image path
                              alt={item.name || "Product image"}
                              width={80}
                              height={80}
                          />
                        </div>
                        <div className={styles.basketItemDetails}>
                          <p className={styles.basketItemName}>{item.title}</p>
                          <span className={styles.basketItemPrice}>
              {item.price} kr
            </span>
                        </div>
                      </div>
                    </div>
                ))
            )}
          </div>


          <div className={styles.modalFooter}>
            <strong> SubTotal</strong>
            <p>{totalPrice} kr </p>
          </div>

          <div className={styles.modalFooter}>
            <strong> Discount</strong>
            <p>{totalDiscount} kr </p>
          </div>

          <div className={styles.modalFooter}>
            <strong> Total</strong>
            <p>{totalPrice} kr </p>
          </div>

          <div>
            <button onClick={handleCheckout} className={styles.checkoutButton}>
              <span>Place Order</span>
              <span className={styles.checkoutPrice}>{totalPrice} kr </span>
            </button>
          </div>
        </div>

        {isBillUpdateModalOpen && (
            <BillUpdateModal
                onClose={handleBillModalClose}
                selectedAddressId={selectedAddressId}
                contactItem={contactItem}
            />
        )}

        {isShipUpdateModalOpen && (
            <ShipUpdateModal
                onClose={handleShipModalClose}
                selectedAddressId={selectedAddressId}
                contactItem={contactItem}
            />
        )}
        {isBillDeleteModalOpen && (
            <BillDeleteModal
                onClose={handleBillDeleteClose}
                selectedAddressId={selectedAddressId}
            />
        )}

        {isShipDeleteModalOpen && (
            <ShipDeleteModal
                onClose={handleShipDeleteClose}
                selectedAddressId={selectedAddressId}
            />
        )}
      </section>
      <ToastContainer/>
    </>
  );
};

export default Checkout;
