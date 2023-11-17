"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUserStore } from "@/stores/userStore";
import styles from "@/app/(admin)/components/Category/Category.module.css";

interface CategoryProps {
  _id: string;
  title: string;
  description: string;
  slug: string;
  status: string;
  isActive: boolean;
  coverImage: string;
  createdAt: Date;
  updatedAt: Date;
}

const Category: React.FC<CategoryProps> = () => {

  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const accessToken = useUserStore((state) => state.accessToken);

  const [selectedOption, setSelectedOption] = useState("option1");
  const [isFocused, setIsFocused] = useState(false);

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  const handleInputFocus = () => {
    setIsFocused(true);
  };
  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://ecommerce-api-5ksa.onrender.com/api/v1/categories',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include the accessToken in the headers
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    if (accessToken) {
      fetchCategories();
    }
  }, [accessToken]);

  console.log(categories); 


  return (
    <>
      <div className={styles.topcontainer}>
        <div className={styles.container}>
          <div
            style={{
              color: "#161F6A",
              fontWeight: "bold",
            }}
          >
            Category
          </div>
          <div>
            <select
              className={styles.select}
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="option1">Category Type</option>
              <option value="option2">Grocery</option>
              <option value="option3">Women Cloth</option>
              <option value="option4">Bags</option>
              <option value="option5">Makeup</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              id={styles.myInput}
              className={isFocused ? styles.focused : ""}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Ex:Search By Name"
            />
          </div>
          <div> </div>
          <Link href={"/admin/category/create"}>
          <button className={styles.button}>+ Add Category</button>
          </Link>
        </div>
        <div className={styles.container2}>

        <table className={styles.tableContainer}>
          {/* Table headers */}
          <thead className={styles.tableHeader}>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Active</th>
              <th>Slug</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className={styles.tableBody}>
              {categories.map((category, index) => (
                <tr key={category._id}>
                  <td>{index}</td>
                  <td>{category.title}</td>
                  <td>{category.status}</td>
                  <td>
                    <span className={`${styles.circle} ${category.isActive ? styles.active : styles.inactive}`} >
                      {category.isActive ? "" : ""}
                    </span>
                  </td>
                  <td>{category.slug}</td>
                  <td>{category.description}</td>
                  <td>
                    <button
                      // onClick={() => handleDelete(category._id)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                    <button
                      // onClick={() => handleUpdate(category)}
                      className={styles.updateButton}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
        </div>
      </div>
    </>
  );
};

export default Category;