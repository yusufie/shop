import React, { useState } from "react";
import styles from "./checkoutshipaddmodal.module.css";
import useshipAddressStore from "@/stores/shipaddressStore";

interface CheckoutBillAddModalProps {
  onClose: () => void;
}

const CheckoutShipAddModal: React.FC<CheckoutBillAddModalProps> = ({
  onClose,
}) => {
  const { shipAddressData, setShipAddressData } = useshipAddressStore();
  const [formData, setFormData] = useState(shipAddressData);

  const handleAdd = () => {
    setShipAddressData(formData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <section className={styles.checkModal} onClick={handleOverlayClick}>
      <div className={styles.checkModalContent}>
        <h1>Yeni Adres Ekle</h1>
        <form className={styles.loginForm}>
          <div className={styles.email}>
            <label htmlFor="alias">Başlık</label>
            <input
              id="alias"
              name="alias"
              value={formData.alias}
              onChange={handleChange}
            />
          </div>
          <div className={styles.radios}>
            <div>
              <label htmlFor="country">Ülke</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="city">Şehir</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.radios}>
            <div>
              <label htmlFor="postalCode">Posta Kodu</label> <br />
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.textarea}>
            <label htmlFor="details">Cadde Adresi</label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="button" onClick={handleAdd} className={styles.btn}>
            Yeni Adres Ekle
          </button>
        </form>
        <button onClick={onClose} className={styles.closeLogin}>
          x
        </button>
      </div>
    </section>
  );
};

export default CheckoutShipAddModal;
