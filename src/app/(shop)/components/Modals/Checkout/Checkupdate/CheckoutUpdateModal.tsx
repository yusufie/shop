import React, { useState } from "react";
import styles from "./checkoutupdatemodal.module.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import useSWR, { mutate } from "swr";

interface CheckoutUpdateModalProps {
  onClose: () => void;
}

const CheckoutUpdateModal: React.FC<CheckoutUpdateModalProps> = ({
  onClose,
}) => {
  // State'leri tanımlayın
  const [countryCode, setCountryCode] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const accessToken = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const userId = userData ? userData._id : null;

  // Overlay'e tıklama işlemi
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Telefon numarası değişikliklerini takip eden fonksiyon
  const handleChange = (value: string | undefined) => {
    if (value) {
      // 'value', PhoneInput bileşeninden gelen birleşik değerdir
      const [code, num] = value.split(" ");
      setCountryCode(code || ""); // Eğer code boşsa, boş bir string atayın
      setNumber(num || ""); // Eğer num boşsa, boş bir string atayın
    }
  };

  // Veriyi tekrar çekmek için useSWR hook'unu kullan
  const { data: userContactData } = useSWR(`/api/v1/orders/contact/${userId}`);

  // Form gönderildiğinde çalışan fonksiyon
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

      if (!userId) {
        throw new Error("User ID bulunamadı");
      }

      const userResponse = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/api/v1/orders/contact/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contact: [
              {
                phone: {
                  countryCode: countryCode,
                  number: number,
                },
              },
            ],
          }),
        }
      );

      if (!userResponse.ok) {
        throw new Error(
          `Kullanıcı adres güncelleme başarısız. HTTP hata! Durum: ${userResponse.status}`
        );
      }

      const responseData = await userResponse.json();
      console.log("Post Response:", responseData);

      // Veriyi tekrar çekmek için mutate fonksiyonunu kullan
      mutate(`/api/v1/orders/contact/${userId}`, undefined, true);

      onClose();
    } catch (error) {
      console.log("Hata:", error);
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <PhoneInput
              international
              placeholder="Telefon numaranızı girin"
              disabled={false}
              value={`${countryCode} ${number}`}
              onChange={handleChange}
              countryProps={{ showFlag: true, showName: false }}
              inputProps={{
                name: "number",
                required: true,
                autoFocus: true,
              }}
            />
            <button type="submit" className={styles.checkButton}>
              İletişim Bilgisini Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutUpdateModal;
