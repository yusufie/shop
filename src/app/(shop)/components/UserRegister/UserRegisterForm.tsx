/* "use client";
import React, { useEffect, useState } from "react";
import headerStyles from "../Header/header.module.css";
import styles from "./userregister.module.css";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import ForgotPassword from "./ForgotPassword";

const UserRegister = () => {
    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);

    const openLoginModal = () => {
        setLoginModal(true);
    };

    const openRegisterModal = () => {
        setLoginModal(false);
        setRegisterModal(true);
    };

    const closeRegisterModal = () => {
        setRegisterModal(false);
        setLoginModal(true);
    };

    const openForgotPassword = () => {
        setLoginModal(false);
        setForgotPassword(true);
    };

    const closeForgotPassword = () => {
        setForgotPassword(false);
        setLoginModal(true);
    };

    // modal dışına tıklayınca modalın kapanmasını sağlar

    const handleOutsideClick = (event: any) => {
        if (event.target.classList.contains(styles.modal)) {
            setLoginModal(false);
            setRegisterModal(false);
            setForgotPassword(false);
        }
    };

    useEffect(() => {
        if (loginModal || registerModal || forgotPassword) {
            document.addEventListener("click", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [loginModal, registerModal, forgotPassword]);

    return (
        <section>
            <button className={headerStyles.become} onClick={openLoginModal}>
                Join
            </button>

            {loginModal && (
                <LoginModal
                    openForgotPassword={openForgotPassword}
                    openRegisterModal={openRegisterModal}
                />
            )}
            {registerModal && (
                <RegisterModal closeregisterModal={closeRegisterModal} />
            )}
            {forgotPassword && (
                <ForgotPassword closeForgotPassword={closeForgotPassword} />
            )}
        </section>
    );
};

export default UserRegister;
 */