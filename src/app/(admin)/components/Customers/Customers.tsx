"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "@/app/(admin)/components/Customers/Customers.module.css";
import Modal from "./Customer.Modal";

const Customers = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [users, setUsers] = useState([] as any);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };
  const handleInputBlur = () => {
    setIsFocused(false);
  };

  // SEACRCH FUNCTİONS
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = useMemo(() => {
    if (!searchTerm) {
      return users?.data || [];
    }

    return (users?.data || []).filter((item: any) =>
      item?.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users?.data]);

  // GET FUNCTIONS

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await fetch(
          "https://ecommerce-api-5ksa.onrender.com/api/v1/users",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response)

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  //  DELETE FUNCTİONS

  const handleDelete = async (id: string) => {
    console.log(id)
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(
        `https://ecommerce-api-5ksa.onrender.com/api/v1/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response, 'donen response')


      if (response.ok) {
        console.log("kullanıcı silindi");
      }

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
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
            Customers
          </div>
          <div>
            <input
              type="text"
              id={styles.myInput}
              className={isFocused ? styles.focused : ""}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Ex:Search By Name"
              onChange={handleSearch}
            />
          </div>
          <div>
            <button onClick={openModal} className={styles.button}>
              + Add Product
            </button>
            {isModalOpen && <Modal onClose={closeModal} />}
          </div>
        </div>

       <div className={styles.container2}>
  <table className={styles.tableContainer}>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>E-mail</th>
        <th>Contact</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      {filteredUsers.map((item: any, index: any) => {
                console.log(item, 'item')
        return (
          <tr key={index}>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.email}</td>
          <td>{item.contact}</td>
          <td>{item.address}</td>
          <td>
            <button onClick={() => handleDelete(item._id)}>delete</button>
          </td>
        </tr>
        )
      }

        
      )}
    </tbody>
  </table>
</div>
</div>
    </>
  );
};

export default Customers;
