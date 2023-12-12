"use client";
import Image from "next/image";
import styles from "./checkout.module.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useEffect, useState } from "react"; // useEffect'i kaldırdım, çünkü burada kullanmış gibi görünmüyor.
import ShipUpdateModal from "../Modals/Checkout/ShippingAdress/ShipUpdateModal";
import ShipDeleteModal from "../Modals/Checkout/ShippingAdress/ShipDeleteModal";
import CheckoutShipAddModal from "../Modals/Checkout/ShippingAdress/CheckoutShipAddModal";
import useBasketStore from "@/stores/basketStore";
import useContactStore from "@/stores/contactStore";
import useNoteStore from "@/stores/noteStore";
import useDeliveryStore from "@/stores/deliveryStore";
import useShipAddressStore from "@/stores/shipaddressStore";
import useAddressStore from "@/stores/addressStore";
import { useUserStore } from "@/stores/userStore";
import useSWR from "swr";
import CheckoutBillAddModal from "../Modals/Checkout/BillingAdresss/CheckoutBillAddModal";
import BillDeleteModal from "../Modals/Checkout/BillingAdresss/BillDeleteModal";
import BillUpdateModal from "../Modals/Checkout/BillingAdresss/BillUpdateModal";
import CheckoutUpdateModal from "../Modals/Checkout/Checkupdate/CheckoutUpdateModal";
import UpdateContact from "./UpdateContact";









interface User {
  _id: string;
  // Add other properties as needed
}

const fetchProducts = (url: any) => fetch(url).then((res) => res.json());
const Checkout: React.FC = ({  }) => {
  // AÇMA KAPAMA STATELERİ
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isBillAddModalOpen, setIsBillAddModalOpen] = useState(false);
  const [isShipAddModalOpen, setIsShipAddModalOpen] = useState(false);
  const [isBillUpdateModalOpen, setIsBillUpdateModalOpen] = useState(false);
  const [isBillDeleteModalOpen, setIsBillDeleteModalOpen] = useState(false);
  const [isShipUpdateModalOpen, setIsShipUpdateModalOpen] = useState(false);
  const [isShipDeleteModalOpen, setIsShipDeleteModalOpen] = useState(false);

  // ZUSTAND STORELAR
  const product = useBasketStore((state) => state.items);
  const addedItemCounts = useBasketStore((state) => state.addedItemCounts);
  const { contactNumber, setContactNumber } = useContactStore();
  const { selectedButtons, handleButtonClick } = useDeliveryStore();
  const { orderNote, setOrderNote } = useNoteStore();

  const noteData = useNoteStore((state) => state);
  const shipAddressData = useShipAddressStore((state) => state);

  const addressData = useAddressStore((state) => state);
  const { user } = useUserStore();

  const deliverySchedule = useDeliveryStore((state) =>
    state.getDeliverySchedule()
  );
  useEffect(() => {
    // deliverySchedule'ı kullanarak gerekli işlemleri gerçekleştir
    console.log("Delivery schedule updated:", deliverySchedule);
  }, [deliverySchedule]);

  // *!!!-------------------------------------GET FUNCTİON-----------------------!!!!*
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
  if (error) return <div>Loading failed</div>;
  if (!datas) return <div>Loading...</div>;

  const userString = localStorage.getItem("user");
  let userId: string | undefined;

  if (userString) {
    // Parse the user data from JSON
    const userData: User = JSON.parse(userString);

    // Extract the user ID
    userId = userData._id;
  }

  if (!userId) {
    throw new Error("User ID bulunamadı");
  }

  // Use filter with the correct type for item
  const userMatches = datas.data.filter((item: User) => item._id === userId);

  console.log("userMatches", userMatches);

  const addressIdsToDelete = userMatches.flatMap(
    (userMatch: any) =>
      userMatch?.addresses?.map((address: any) => address?._id) || []
  );

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
        alias: addressData.alias,
        details: addressData.details,
        city: addressData.city,
        postalCode: addressData.postalCode,
        country: addressData.country,
      },
      shippingAddress: {
        alias: shipAddressData.alias,
        details: shipAddressData.details,
        city: shipAddressData.city,
        postalCode: shipAddressData.postalCode,
        country: shipAddressData.country,
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

      alert("Alkış sonunda başardın ");
    } catch (error: any) {
      console.error("Error creating order:", error.message);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  // *!!!!---------------------------------HANDLE FUNCTİONLAR------------------------!!!!*

  const handleChange = (number: string) => {
    setContactNumber(number);
  };
  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNote = event.target.value;
    setOrderNote(newNote);
  };
  // AÇMA KAPAMA
  const handleUpdateClick = () => {
    setIsUpdateModalOpen(true);
  };
  const handleBillUpdateClick = () => {
    setIsBillUpdateModalOpen(true);
  };
  const handleShipUpdateClick = () => {
    setIsShipUpdateModalOpen(true);
  };
  const handleBillAddClick = () => {
    setIsBillAddModalOpen(true);
  };
  const handleShipAddClick = () => {
    setIsShipAddModalOpen(true);
  };
  const handleBillDeleteClick = () => {
    setIsBillDeleteModalOpen(true);
  };
  const handleShipDeleteClick = () => {
    setIsShipDeleteModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };
  const handleBillAddModalClose = () => {
    setIsBillAddModalOpen(false);
  };
  const handleShipAddModalClose = () => {
    setIsShipAddModalOpen(false);
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
    <section className={styles.checkout}>
      <div className={styles.checkoutInfo}>
        <UpdateContact userData={userMatches} />
        <div className={styles.billing}>
          <div className={styles.billingHeader}>
            <div>
              <span className={styles.serial}>2</span>
              <span className={styles.title}>Billing Address</span>
            </div>
            <button
              onClick={handleBillAddClick}
              className={styles.updateButton}
            >
              + Add
            </button>
          </div>
          <div className={styles.map}>
            {userMatches.map((userMatch: any, _id: any) => (
              <>
                {userMatch?.addresses?.length > 0 &&
                  userMatch.addresses.map(
                    (contactItem: any, contactIndex: any) => (
                      <div className={styles.billingInput} key={contactIndex}>
                        <div className={styles.inputTop}>
                          <h4>Billing</h4>
                          <div className={styles.hoverButtons}>
                            <button
                              onClick={handleBillUpdateClick}
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
                              onClick={handleBillDeleteClick}
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
                    )
                  )}
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

            <button
              onClick={handleShipAddClick}
              className={styles.updateButton}
            >
              + Add
            </button>
          </div>
          <div className={styles.map}>
            {userMatches.map((userMatch: any, _id: any) => (
              <>
                {userMatch?.addresses?.length > 0 &&
                  userMatch.addresses.map(
                    (contactItem: any, contactIndex: any) => (
                      <div className={styles.shippingInput} key={contactIndex}>
                        <div className={styles.inputTop}>
                          <h4>Shipping</h4>
                          <div className={styles.hoverButtons}>
                            <button
                              onClick={handleShipUpdateClick}
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
                              onClick={handleShipDeleteClick}
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
              placeholder="Sipariş notunuzu buraya yazın..."
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
                {addedItemCounts[item._id]} x {item.description} | 1lb
              </span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
          <span>SubTotal:${totalPrice}</span>
        </div>

        <button onClick={handleCheckout} className={styles.availableButton}>
          Place Order
        </button>
      </div>
      {isUpdateModalOpen && (
        <CheckoutUpdateModal onClose={handleUpdateModalClose} />
      )}
      {isBillUpdateModalOpen && (
        <BillUpdateModal
          userMatches={userMatches}
          onClose={handleBillModalClose}
        />
      )}
      {isShipUpdateModalOpen && (
        <ShipUpdateModal
          userMatches={userMatches}
          onClose={handleShipModalClose}
        />
      )}
      {isBillDeleteModalOpen && (
        <BillDeleteModal
          userMatches={userMatches}
          onClose={handleBillDeleteClose}
          addressIdsToDelete={addressIdsToDelete}
        />
      )}
      {isShipDeleteModalOpen && (
        <ShipDeleteModal
          userMatches={userMatches}
          onClose={handleShipDeleteClose}
          addressIdsToDelete={addressIdsToDelete}
        />
      )}
      {isBillAddModalOpen && (
        <CheckoutBillAddModal onClose={handleBillAddModalClose} />
      )}
      {isShipAddModalOpen && (
        <CheckoutShipAddModal onClose={handleShipAddModalClose} />
      )}
    </section>
  );
};

export default Checkout;
