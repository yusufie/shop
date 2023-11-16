"use client"
import React, { useState } from "react";
import styles from "@/app/(admin)/components/Products/Products.module.css";
import Modal from "@/app/(admin)/components/Modal/Modal";
import useSWR from "swr";
import Image from "next/image";

const fetchProducts = (url:any) => fetch(url).then((res) => res.json());

const ProductList: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // !!!----------------------------------GET FUNCTİON--------------------------???

  const {
    data: datas,
    error,
    mutate,
  } = useSWR(
    "https://ecommerce-api-5ksa.onrender.com/api/v1/products?limit=20",
    fetchProducts
  );

  if (error) return <div>Loading failed</div>;
  if (!datas) return <div>Loading...</div>;
  console.log(datas);
  const fetchData = async () => {
    const news = await fetchProducts(
      "https://ecommerce-api-5ksa.onrender.com/api/v1/products?limit=20"
    );

    mutate(news);
  };

  fetchData();

  // !!-----------------------DELETE FUNCTİON-------------------------------------------!!
  const deleteProduct = async (id: any) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const response = await fetch(
      `https://ecommerce-api-5ksa.onrender.com/api/v1/products/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Silme işlemi başarısız oldu.");
    }

    return response.json();
  };

  const handleDelete = async (id: any) => {
    try {
      await deleteProduct(id);
      mutate();
    } catch (error) {
      console.error(error);
    }
  };

  const DeleteButton: React.FC<{ id: number }> = ({ id }) => {
    const handleClick = () => {
      handleDelete(id);
    };

    return (
      <button onClick={handleClick} className={styles.deleteButton}>
        Sil
      </button>
    );
  };
  // !!!!!------------------PUT FUNCTİON------------------------------------------!!!!!

  const openUpdateModal = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };
  const updateProduct = async (id: number, updatedData: Partial<Product>) => {
    const accessToken = localStorage.getItem("accessToken");
    
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const response = await fetch(
      `https://ecommerce-api-5ksa.onrender.com/api/v1/products/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    const handleUpdate = async () => {
      try {
        if (selectedProduct) {
          const updatedData = {
            // Güncellenmiş verileri burada belirtin
            title: "Yeni Başlık",
            price: 100,
            // ... diğer alanlar
          };

          await updateProduct(selectedProduct._id, updatedData);
          mutate();
          closeModal(); // veya başka bir işlem yapabilirsiniz
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (!response.ok) {
      throw new Error("Güncelleme işlemi başarısız oldu.");
    }

    return response.json();
  };

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSearch = () => {
    const filteredResults = datas?.data.filter((item: any) =>
      item?.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <>
      <div className={styles.topcontainer}>
        <div className={styles.container}>
          <div style={{ color: "#161F6A", fontWeight: "bold" }}>Product</div>
          {/* <div> */}
            {/* <select */}
              {/* // className={styles.select} */}
              {/* // value={selectedOption} */}
              {/* // onChange={handleSelectChange} */}
            {/* // > */}
              {/* <option value="option6">Price</option> */}
              {/* <option value="option7">Highest to Lowest</option> */}
              {/* <option value="option8">Lowest To Highest</option> */}
            {/* </select> */}
          {/* </div> */}
          <div>
            <input
              type="text"
              id={styles.myInput}
              className={isFocused ? styles.focused : ""}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Örnek: İsme Göre Ara"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} className={styles.button}>
              Ara
            </button>
          </div>
          <div> </div>
          <button onClick={openModal} className={styles.button}>
            + Add Product
          </button>
          {isModalOpen && <Modal onClose={closeModal} />}
        </div>
        <div className={styles.cardcontainer}>
          {searchResults.length > 0
            ? searchResults.map((item: any) => (
                <div className={styles.card} key={item._id}>
                  <div className={styles.cardImg}>
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      width={256}
                      height={256}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.cardPrice}>${item.price}</span>
                    <p>{item.title}</p>
                    <div className={styles.afterButton}>
                      <DeleteButton id={item._id} />
                      <button onClick={() => openUpdateModal(item)}>
                        Güncelle
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : datas?.data.map((item: any) => (
                <div className={styles.card} key={item._id}>
                  <div className={styles.cardImg}>
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      width={256}
                      height={256}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.cardPrice}>${item.price}</span>
                    <p>{item.title}</p>
                    <div className={styles.afterButton}>
                      <DeleteButton id={item._id} />
                      <button onClick={() => openUpdateModal(item)}>
                        Güncelle
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        {/* {selectedProduct && isModalOpen && ( */}
          {/* // <Modal onClose={() => closeModal()}> */}
            {/* Güncelleme için gerekli form veya bileşenleri ekleyin */}
            {/* <button onClick={() => handleUpdate()}>Güncelle</button> */}
          {/* </Modal> */}
        {/* // )} */}
      </div>
    </>
  );
};

export default ProductList;
