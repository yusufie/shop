"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/stores/userStore";
// import { revalidateTag } from "next/cache";
import styles from "@/app/(admin)/components/Category/Category.module.css";

interface DatabaseEntry {
  _id?: string;
  title?: string;
  description?: string;
  slug?: string;
  status?: string;
  isActive?: boolean;
  products?: any[];
  coverImage?: string;
  parent?: string;
  categories?: any;
}

// data as props
interface CategoryProps {
  categories: DatabaseEntry;
}

const Category: React.FC<CategoryProps> = ({ categories }) => {
  const accessToken = useUserStore((state) => state.accessToken);
  // console.log("accessToken:", accessToken);

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

  const handleDelete = async (categoryId: string) => {
    try {
      const response = await fetch(
        `https://ecommerce-api-5ksa.onrender.com/api/v1/categories/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // delete category from database
      if (response.ok) {
        console.log("Category deleted successfully");
        // await revalidateTag("categoriesData");
        alert("Category deleted successfully");
        // refresh page
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              {categories.categories.map((category:any, index:any) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td>{category.title}</td>
                  <td>{category.status}</td>
                  <td>
                    <span
                      className={`${styles.circle} ${
                        category.isActive ? styles.active : styles.inactive
                      }`}
                    >
                      {category.isActive ? "" : ""}
                    </span>
                  </td>
                  <td>{category.slug}</td>
                  <td>{category.description}</td>
                  <td className={styles.actionButtons}>
                    <button
                      onClick={() => category._id && handleDelete(category._id)}
                      className={styles.deleteButton}
                    >
                      <Image
                        src="/icons/trash.svg"
                        alt="delete"
                        width={20}
                        height={20}
                      />
                    </button>

                    <Link href={`/admin/category/${category._id}`}>
                      <button className={styles.updateButton}>
                        <Image
                          src="/icons/pen-square.svg"
                          alt="edit"
                          width={20}
                          height={20}
                        />
                      </button>
                    </Link>
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
