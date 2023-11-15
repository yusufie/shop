import Image from "next/image";
import styles from "@/app/(admin)/components/Modal/Modal.module.css";
import { useState } from "react";
import { UploadIcon } from "../../assets/icons/UploadIcon";

interface BasketModalProps {
  onClose: () => void;
}

const BasketModal: React.FC<BasketModalProps> = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log('succesfull')
  }

  return (
    <>
      <section className={`${styles.basketmodal} ${styles.open}`}>
        <div className={styles.container}>
          <h1 className={styles.header}>Add Product</h1>
          <div className={styles.fileAdd}>
            <p className={styles.leftTitle}>Upload your Product image here</p>
            <div className={styles.imageAdd}>
              <div className={styles.dashed}>
                <label htmlFor="fileAdd">
                  <UploadIcon />
                </label>
                <input type="file" id="fileAdd" />
              </div>
            </div>
          </div>

          <div className={styles.productAdd}>
            <p className={styles.leftTitle}>
              Add your Product description and necessary information from here
            </p>
            <form className={styles.formAdd}>
              <label htmlFor="">Name</label>
              <input type="text" />
              <label htmlFor="">Description</label>
              <textarea />
              <label htmlFor="">Slug</label>
              <input type="text" />
              <label htmlFor="">Price</label>
              <input type="text" />
              <label htmlFor="">Stock</label>
              <input type="text" />
              <label htmlFor="">Discount</label>
              <input type="text" />
            </form>
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button  onClick={handleSubmit} className={styles.createProductButton}>Create Product</button>
        </div>
      </section>
      <div className={styles.overlay}></div>
    </>
  );
};

export default BasketModal;
