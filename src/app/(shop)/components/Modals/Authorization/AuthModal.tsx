
"use client"
import React, { useState } from 'react';
import LoginModal from '../Login/LoginModal';
import RegisterModal from '../Register/RegisterModal';
import ForgotPasswordModal from '../Forgot/ForgotModal';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(true);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);

  const openRegisterModal = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
  };

  const openForgotPasswordModal = () => {
    setLoginModalOpen(false);
    setForgotPasswordModalOpen(true);
  };

  const closeForgotPasswordModal = () => {
    setLoginModalOpen(true);
    setForgotPasswordModalOpen(false);
  };

  return (
    <>
      {isLoginModalOpen ? (
        <LoginModal
          openRegisterModal={openRegisterModal}
          openForgotPasswordModal={openForgotPasswordModal}
          onClose={onClose}
        />
      ) : isRegisterModalOpen ? (
        <RegisterModal onClose={closeRegisterModal} />
      ) : (
        <ForgotPasswordModal onClose={closeForgotPasswordModal} />
      )}
    </>
  );
};

export default AuthModal;
