"use client"
import styles from "@/app/(admin)/components/Modal/Modal.module.css";
import { useState } from "react";
import { UploadIcon } from "../../assets/icons/UploadIcon";

interface BasketModalProps {
  onClose: () => void;
  selectedProduct: Product | null; // Bu satırı ekleyin
  onUpdate: (updatedData: Partial<Product>) => void;
}


const BasketModal: React.FC<BasketModalProps> = ({
  onClose,
  selectedProduct,
  onUpdate,
}) => {
  // !!!!------------------POST FUNCTİON---------------!!!!
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    stock: "",
    description: "",
    price: "",
    discount: "",
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (
      name === "image" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      // Step 1: Upload the image
      const imageFormData = new FormData();
      if (formData.image) {
        imageFormData.append("file", formData.image);
        const imageUploadResponse = await fetch(
          "https://ecommerce-api-5ksa.onrender.com/api/v1/upload/single",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: imageFormData,
          }
        );

        if (!imageUploadResponse.ok) {
          throw new Error(
            `Image upload failed. HTTP error! Status: ${imageUploadResponse.status}`
          );
        }

        const imageUploadData = await imageUploadResponse.json();
        const imageUrl = imageUploadData.result.url;

        // Step 2: Post product data with the obtained image URL
        const productResponse = await fetch(
          "https://ecommerce-api-5ksa.onrender.com/api/v1/products",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...formData,
              images: [imageUrl], // Use the obtained image URL
            }),
          }
        );

        if (!productResponse.ok) {
          throw new Error(
            `Product creation failed. HTTP error! Status: ${productResponse.status}`
          );
        }

        const responseData = await productResponse.json();
        console.log("Post Response:", responseData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleUpdate = async () => {
    try {
      if (selectedProduct) {
        // Güncellenmiş verileri almak için formData veya başka bir yol kullanın
        const updatedData = {
          title: "Yeni Başlık",
          price: 100,
          // ... diğer alanlar
        };

        await updateProduct(selectedProduct._id, updatedData);
        onUpdate(updatedData); // Ebeveyni güncelleme hakkında bilgilendir
        onClose(); // Modal'ı kapat veya başka bir işlem yap
      }
    } catch (error) {
      console.error(error);
    }
  };


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
                <input
                  onChange={handleChange}
                  type="file"
                  id="fileAdd"
                  name="image"
                />
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
              {/* <label htmlFor="discount">Categories</label> */}
              {/* <select name="" id=""> */}
              {/* <option value="">Category1</option> */}
              {/* <option value="">Category2</option> */}
              {/* <option value="">Category3</option> */}
              {/* </select> */}
              <div className={styles.buttons}>
                <button
                  type="button"
                  onClick={onClose}
                  className={styles.cancelButton}
                >
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