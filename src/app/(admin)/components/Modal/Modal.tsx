import Image from "next/image";
import styles from "@/app/(admin)/components/Modal/Modal.module.css";
import { useState } from "react";

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

 
  return (
    <section className={`${styles.basketmodal} ${styles.open}`}>

        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClose}>x</button>
          <h1>Add Product </h1>
        </div>

       <div className={styles.container} >

    

            <div className={styles.upload} >
                <h1>Upload your Product image here</h1>
                 <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.upInput}
          />
          {selectedImage && (
            <Image
              src={URL.createObjectURL(selectedImage)}
              alt="Selected Image"
              className={styles.selectedImage}
              width={200}
              height={200}
            />
          )}

            </div>
            <div className={styles.form1} >
              <h1>Add your Product description and necessary  <br /> information from here  </h1>
               <div className={styles.form2}>
            <form action="">
              <div className={styles.formInput}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" />
              </div>
              <div className={styles.formInput}>
                <label htmlFor="description">Description</label>
                <input type="text" id="description" />
              </div>
              <div className={styles.formInput}>
                <label htmlFor="unit1">Unit</label>
                <input type="text" id="unit1" />
              </div>
              <div className={styles.formInput}>
                <label htmlFor="unit2">Unit</label>
                <input type="text" id="unit2" />
              </div>
              <div className={styles.formInput}>
                <label htmlFor="unit3">Unit</label>
                <input type="text" id="unit3" />
              </div>
              <div className={styles.formInput}>
                <label htmlFor="unit4">Unit</label>
                <input type="text" id="unit4" />
              </div>
              <div className={styles.formInput}>
                <label htmlFor="unit5">Unit</label>
                <input type="text" id="unit5" />
              </div>
              <select className={styles.formInput} id="simpleSelect1">
                <option value="">Lütfen bir seçenek seçin</option>
                <option value="option1">Seçenek 1</option>
                <option value="option2">Seçenek 2</option>
                <option value="option3">Seçenek 3</option>
              </select>
              <select className={styles.formInput} id="simpleSelect2">
                <option className={styles.formInput} value="">Lütfen bir seçenek seçin</option>
                <option className={styles.formInput} value="option1">Seçenek 1</option>
                <option className={styles.formInput} value="option2">Seçenek 2</option>
                <option  className={styles.formInput} value="option3">Seçenek 3</option>
              </select>
            </form>
               </div>
          
        </div>
           </div>
        <div className={styles.modalFooter}>
          <button className={styles.checkoutButton1} onClick={onClose} >
               <span>Close</span>
          </button>
          <button className={styles.checkoutButton}>
            <span>Create Product</span>
          </button>
        </div>
        
    </section>
  );
};

export default BasketModal;
