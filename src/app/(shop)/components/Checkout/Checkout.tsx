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
import BillDeleteModal from "../Modals/Checkout/BillingAdresss/BillDeleteModal";
import BillUpdateModal from "../Modals/Checkout/BillingAdresss/BillUpdateModal";
import UpdateContact from "./UpdateContact";
import AuthModal from "@/app/(shop)/components/Modals/Authorization/AuthModal";

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

  const deliverySchedule = useDeliveryStore((state) =>
    state.getDeliverySchedule()
  );

  useEffect(() => {
    // console.log("Delivery schedule updated:", deliverySchedule);
  }, [deliverySchedule]);
  // *!!!-------------------------------------GET USER---------------------------------------!!!!*
  const {
    data: datas,
    error,
    mutate,
  } = useSWR(process.env.NEXT_PUBLIC_API_URL + `/api/v1/users`, async (url) => {
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
  });

  // Check if the user is logged in
  if (!userStore.isLoggedIn) {
    // Display AuthModal if the user is not logged in
    return <AuthModal onClose={() => router.push("/checkout")} />;
  }

  if (error) return <div>Loading failed</div>;
  if (!datas) return <div>Loading...</div>;
  mutate(datas);
  const userString = localStorage.getItem("user");
  let userId: string | undefined;

  if (userString) {
    const userData: User = JSON.parse(userString);

    userId = userData._id;
  }

  if (!userId) {
    throw new Error("User ID bulunamadı");
  }

  // Use filter with the correct type for item
  const userMatches = datas.data.filter((item: User) => item._id === userId);

  // console.log("userMatches", userMatches);

  const addressIdsTo = userMatches.flatMap(
    (userMatch: any) =>
      userMatch?.addresses?.map((address: any) => address) || []
  );
  // console.log(addressIdsTo[0].alias);

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
      contact: userMatches.flatMap((userMatch: any) =>
        userMatch?.contact?.length > 0
          ? userMatch.contact.map((contactItem: any, contactIndex: any) => ({
              phone: {
                countryCode: contactItem.phone.countryCode,
                number: contactItem.phone.number,
              },
            }))
          : []
      ),
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
              {userMatches &&
                userMatches.map((userMatch: any) => (
                  <>
                    {userMatch?.addresses?.length > 0 &&
                      userMatch.addresses.map((contactItem: any, _id: any) => (
                        <div
                          key={contactItem._id}
                          className={styles.billingInput}
                        >
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
                              <strong>Street Address:</strong>{" "}
                              {contactItem.details} <br />
                              <strong>City:</strong> {contactItem.city} <br />
                              <strong>Country:</strong> {contactItem.country}{" "}
                              <br />
                              <strong>Postal Code:</strong>{" "}
                              {contactItem.postalCode} <br />
                            </div>
                          </div>
                        </div>
                      ))}
                  </>
                ))}
            </div>
          </div>
          <div className={styles.shipping}>
            <div className={styles.shippingHeader}>
              <div>
                <span className={styles.serial}>3</span>
                <span className={styles.title}>Shipping Address</span>
              </div>
            </div>
            <div className={styles.map}>
              {userMatches &&
                userMatches.map((userMatch: any, _id: any) => (
                  <>
                    {userMatch?.addresses?.length > 0 &&
                      userMatch.addresses.map(
                        (contactItem: any, contactIndex: any) => (
                          <div
                            className={styles.shippingInput}
                            key={contactItem._id}
                          >
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
                                <strong>Title:</strong> {contactItem.alias}{" "}
                                <br />
                                <strong>Street Address:</strong>{" "}
                                {contactItem.details} <br />
                                <strong>City:</strong> {contactItem.city} <br />
                                <strong>Country:</strong> {contactItem.country}{" "}
                                <br />
                                <strong>Postal Code:</strong>{" "}
                                {contactItem.postalCode} <br />
                              </div>
                            </div>
                          </div>
                        )
                      )}
                  </>
                ))}
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

        <div className={styles.checkoutCalculate}>
          <div className={styles.orderHeader}>
            <h4>Your Order</h4>
          </div>

          <div className={styles.orderItems}>
            {product.map((item: any) => (
              <div key={item._id} className={styles.orderItem}>
                <span>
                  <span style={{ fontWeight: "bold" }}>
                    {addedItemCounts[item._id]}
                  </span>{" "}
                  x {item.description} | 1lb
                </span>
                <span style={{ fontWeight: "bold" }}>
                  NOK{item.price.toFixed(2)}
                </span>
              </div>
            ))}
            <span style={{ fontWeight: "bold" }}>
              SubTotal: {totalPrice} NOK
            </span>
          </div>

          <button onClick={handleCheckout} className={styles.availableButton}>
            Place Order
          </button>
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
      <ToastContainer />
    </>
  );
};

export default Checkout;
