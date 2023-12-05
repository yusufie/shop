"use client";
import React, { useEffect, useState } from "react";
import styles from "./verifyemail.module.css";
import {useSearchParams } from "next/navigation";
import Image from "next/image";
import AuthModal from "../Modals/Authorization/AuthModal";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = "tugbatalkenglishh@gmail.com";

  const [emailVerified, setEmailVerified] = useState(false);
  const [isVerify, setIsVerify] = useState(false);

  useEffect(() => {
    if (token) {
      const sendVerificationRequest = async () => {
        console.log("token kontrol", token);
        try {
          const response = await fetch(
            `https://ecommerce-api-5ksa.onrender.com/api/v1/auth/verify-email/${token}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: email, token: token }),
            }
          );

          if (response.ok) {
            setEmailVerified(true);
            console.log("Email verification successful!", response);
          } else {
            const errorData = await response.json();
            alert('Your email could not be verified')
            console.log("Failed to verify email hata:", errorData);
            console.log(response, "responsee");
          }
        } catch (error) {
          console.error("Error while verifying email:", error);
        }
      };
      sendVerificationRequest();
    } else {
      console.log("tokenn yokk");
    }
  }, [token]);

  const handleLoginModal = () => {
    setIsVerify(!isVerify);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Image
          className={styles.logo}
          src="/images/grand.png"
          alt="logo"
          width={163}
          height={45}
        />
        <p className={styles.message}>Verification in progress...</p>
        {emailVerified && (
          <p className={styles.successfulVerified}>
            Email verified successfully!
          </p>
        )}

        {emailVerified && (
          <button className={styles.link} onClick={handleLoginModal}>
            Please log in to continue
          </button>
        )}
      </div>
      {isVerify && <AuthModal  onClose={handleLoginModal} />}
    </div>
  );
};

export default VerifyEmail;
