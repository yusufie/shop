"use client";
import React, { useState } from "react";
import styles from "./register.module.css";
import Image from "next/image";

const RegisterPage = () => {
  const [showModal, setShowModal] = useState(true);
  const [loginModal, setLoginModal] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openLoginModal = () => {
    setShowModal(false);
    setLoginModal(true);
  };

  const closeLoginModal = () => {
    setLoginModal(false);
    setShowModal(true);
  };

  const openForgotPassword = () => {
    setShowModal(false);
    setForgotPassword(true);
  };

  const closeForgotPassword = () => {
    setForgotPassword(false);
    setShowModal(true);
  };
  return (
    <section>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <Image
              className={styles.logo}
              src={"/images/logo.png"}
              alt="logo"
              width={160}
              height={26}
            />
            <p>Login to admin</p>
            <form action="">
              <div className={styles.email}>
                <label htmlFor="">Email</label>
                <input type="email" />
              </div>
              <div className={styles.password}>
                <div className={styles.forgotPassword}>
                  <label htmlFor="">Password</label>
                  <span
                    onClick={openForgotPassword}
                    onKeyDown={openForgotPassword}
                    tabIndex={0}
                  >
                    Forgot password?
                  </span>
                </div>
                <input type="password" />
              </div>
              <button className={styles.btn}>Login</button>
            </form>
            <div className={styles.horizontal}>
              <hr />
              <span>Or</span>
            </div>
            <div className={styles.account}>
              Don&apos;t have any account?{" "}
              <button onClick={openLoginModal}>Register as Shop Owner</button>
            </div>
          </div>
        </div>
      )}
      {loginModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <Image
              className={styles.logo}
              src={"/images/logo.png"}
              alt="logo"
              width={160}
              height={26}
            />
            <p>Register new account</p>
            <form action="">
              <div className={styles.email}>
                <label htmlFor="">Name</label>
                <input type="text" />
              </div>
              <div className={styles.email}>
                <label htmlFor="">Email</label>
                <input type="email" />
              </div>
              <div className={styles.password}>
                <label htmlFor="">Password</label>
                <input type="password" />
              </div>
              <button className={styles.btn}>Register</button>
            </form>
            <div className={styles.horizontal}>
              <hr />
              <span>Or</span>
            </div>
            <div className={styles.account}>
              Already have an account?{" "}
              <button onClick={closeLoginModal}>Login</button>
            </div>
          </div>
        </div>
      )}

      {forgotPassword && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <Image
              className={styles.logo}
              src={"/images/logo.png"}
              alt="logo"
              width={160}
              height={26}
            />
            <p>Forgot password</p>
            <form action="">
              <div className={styles.email}>
                <label htmlFor="">Email</label>
                <input type="email" />
              </div>
              <button className={styles.btn}>Submit Email</button>
            </form>
            <div className={styles.horizontal}>
              <hr />
              <span>Or</span>
            </div>
            <div className={styles.account}>
              Back to <button onClick={closeForgotPassword}>Login</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RegisterPage;
