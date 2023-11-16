import styles from "@/app/(admin)/components/Modal/Modal.module.css";
import { useState } from "react";

interface CustomerModalProps {
  onClose: () => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // contact: "",
    // address: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTIzNGJiMDA0ZDk5YTljZjY2OWM5MCIsImVtYWlsIjoidHVnYmEtZ3VuZGdkdUBnbWFpbC5jb20iLCJpYXQiOjE3MDAxMzI3NDEsImV4cCI6MTcwMDIxOTE0MX0.IwoWXlOgEqvD7guW9lB-F3J1uN2U4QFU2rMy7bEL7vs";
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await fetch(
        "https://ecommerce-api-5ksa.onrender.com/api/v1/users",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Post Response:", responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <section className={`${styles.basketmodal} ${styles.open}`}>
        <div className={styles.container}>
          <div className={styles.productAdd}>
            <p className={styles.leftTitle}>
              Add your Product description and necessary information from here
            </p>
            <form className={styles.formAdd}>
              <label htmlFor="">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                id="firstName"
                name="firstName"
              />
              <label htmlFor="">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                id="lastName"
                name="lastName"
              />
              <label htmlFor="">E-mail</label>
              <input
                type="text"
                value={formData.email}
                onChange={handleChange}
                id="email"
                name="email"
              />
              {/* <label htmlFor="">Contact</label>
              <input
                type="text"
                value={formData.contact}
                onChange={handleChange}
                id="contact"
                name="contact"
              />
              <label htmlFor="">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              /> */}
              <div className={styles.buttons}>
                <button onClick={onClose} className={styles.cancelButton}>
                  Cancel
                </button>
                <button onClick={handleSubmit} className={styles.createProductButton}>
                  Create Users
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className={styles.overlay}></div>
    </>
  );
};

export default CustomerModal;
