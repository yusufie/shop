import React, { useState, useCallback } from "react";
import styles from "./shipupdatemodal.module.css";
import useSWR, { mutate } from "swr";

interface BillUpdateModalProps {
  onClose: () => void;
  userMatches: any;
}

const ShipUpdateModal: React.FC<BillUpdateModalProps> = ({
  onClose,
  userMatches,
}) => {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>("");
  const [newContactNumber, setNewContactNumber] = useState({
    alias: "",
    country: "",
    city: "",
    postalCode: "",
    streetAddress: "",
  });
  const accessToken = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const userId = userData ? userData._id : null;
  const { data: userResponseData } = useSWR(
    selectedAddressId
      ? `/api/v1/orders/${userId}/address/${selectedAddressId}`
      : null
  );

  const handleAddressSelection = useCallback((addressId: string) => {
    setSelectedAddressId(addressId);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Erişim token'ı bulunamadı");
      }

      const user = localStorage.getItem("user");
      let userId;
      if (user) {
        const userData = JSON.parse(user);
        userId = userData._id;
      }

      if (!userId || !selectedAddressId) {
        throw new Error("User ID or selected address ID not found");
      }

      const userResponse = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          `/api/v1/orders/${userId}/address/${selectedAddressId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            alias: newContactNumber.alias,
            country: newContactNumber.country,
            city: newContactNumber.city,
            postalCode: newContactNumber.postalCode,
            streetAddress: newContactNumber.streetAddress,
          }),
        }
      );

      if (!userResponse.ok) {
        throw new Error(
          `User address update failed. HTTP error! Status: ${userResponse.status}`
        );
      }

      // Veriyi tekrar çekmek için mutate fonksiyonunu kullan
      mutate(
        `/api/v1/orders/${userId}/address/${selectedAddressId}`,
        undefined,
        true
      );

      onClose();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewContactNumber((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className={styles.checkModal} onClick={handleOverlayClick}>
      <div className={styles.checkModalContent}>
        <h1>Update Address</h1>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <ul>
            {userMatches.map((userMatch: any) =>
              userMatch?.addresses?.map((address: any) => (
                <li
                  key={address._id}
                  onClick={() => handleAddressSelection(address._id)}
                  className={
                    selectedAddressId === address._id ? styles.selected : ""
                  }
                >
                  <div style={{ cursor: "pointer" }}>
                    <p>select your adresss</p>
                    {address.country && address.city
                      ? `${address.country} ${address.city}  ${address._id}`
                      : "Unknown Address"}
                  </div>
                </li>
              ))
            )}
          </ul>
          <div className={styles.email}>
            <label htmlFor="alias">Title</label>
            <input
              id="alias"
              name="alias"
              value={newContactNumber.alias}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.radios}>
            <div>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={newContactNumber.country}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={newContactNumber.city}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.radios}>
            <div>
              <label htmlFor="postalCode">ZIP</label> <br />
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={newContactNumber.postalCode}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.textarea}>
            <label htmlFor="streetAddress">Street Address</label>
            <textarea
              id="streetAddress"
              name="streetAddress"
              value={newContactNumber.streetAddress}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" value="submit" className={styles.btn}>
            Update Address
          </button>
        </form>
        <button onClick={onClose} className={styles.closeLogin}>
          x
        </button>
      </div>
    </section>
  );
};

export default ShipUpdateModal;
