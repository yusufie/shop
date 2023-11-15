import styles from "@/app/(admin)/components/Modal/Modal.module.css";
import { useState } from "react";
import { UploadIcon } from "../../assets/icons/UploadIcon";

interface BasketModalProps {
  onClose: () => void;
}

const BasketModal: React.FC<BasketModalProps> = ({ onClose }) => {
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    stock: '',
    description: '',
    price: '',
    discount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await fetch(
        'https://ecommerce-api-5ksa.onrender.com/api/v1/products',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Post Response:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

/*   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  }; */

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
            <form className={styles.formAdd} onSubmit={handleSubmit}>
            <label htmlFor="title">Name *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <label htmlFor="slug">Slug</label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
            />
            <label htmlFor="price">Price *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
            <label htmlFor="discount">Discount</label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
            <div className={styles.buttons}>
              <button type="button" onClick={onClose} className={styles.cancelButton}>
                Cancel
              </button>
              <button type="submit" className={styles.createProductButton}>
                Create Product
              </button>
            </div>
          </form>

          </div>
        </div>
{/*         <div className={styles.buttons}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            onClick={handleAddProduct}
            className={styles.createProductButton}
          >
            Create Product
          </button>
        </div> */}
      </section>
      <div className={styles.overlay}></div>
    </>
  );
};

export default BasketModal;