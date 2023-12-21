"use client";
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/utils/formSchema'
import { useUserStore } from '@/stores/userStore';
import Image from 'next/image';
import Link from "next/link";
import styles from './loginmodal.module.css'

interface LoginModalProps {
  onClose: () => void;
  openRegisterModal: () => void;
  openForgotPasswordModal: () => void;
}

type FormValues = {
  email: string;
  password: string;
};

const LoginModal = ({onClose, openRegisterModal, openForgotPasswordModal}: LoginModalProps) => {

  const userStore = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  // send data to the "/api/v1/auth/login" route
  const onSubmit = async (data: FormValues,) => {

    try {
      setIsSubmitting(true);

      const userData = {
        email: data.email,
        password: data.password,
      }
      console.log('Submitted Data:', userData);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/login";

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });


      console.log('Response:', response);

      if (response.ok) {
        reset();

        // Extract and store user data
        const responseData = await response.json();
        const { accessToken, refreshToken, user } = responseData.data;

        // Store the tokens and user data in state management system and local storage
        userStore.setLoggedIn(accessToken, refreshToken, user);

        console.log('User is logged in', user);

        // Close the modal or navigate to another page
        onClose();

      } else {
        alert('Login failed');
      }

    } catch (error) {
      console.error('Error:', error);
    } finally {
        setIsSubmitting(false); // Re-enable submit button
    }
  }

  return (
    <section className={styles.loginmodal}>
      <div className={styles.loginModalContent}>

        <Link href="/">
          <Image
            className={styles.logo}
            src={"/images/grand.png"}
            alt="logo"
            width={163} height={45}
          />
        </Link>
        
        <p>Login with your email & password</p>

        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>

        <div className={styles.email}>
          <label htmlFor="email">Email</label>
          <input {...register("email")} id="email" placeholder="Enter your email..."/>
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>

        <div className={styles.password}>

          <div className={styles.forgotPassword}>
            <label htmlFor="password">Password:</label>
            <span 
              onClick={openForgotPasswordModal}
            >
              Forgot Password?
            </span>
          </div>

          <input {...register("password")} id="password" placeholder="Enter your password..."/>
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>

          <button type="submit" value="submit" disabled={isSubmitting}
            className={`${styles.btn} ${isSubmitting ? styles.loading : ''}`}>
              {isSubmitting ? (
                <>
                  <span className={styles.spinner} /> {/* spinner */}
                  <span>Logging in...</span> {/* while submitting */}
                </>
              ) : (
                <span>Login</span>
              )}
          </button>

        </form>

        <div className={styles.horizontal}>
          <hr />
          <span>Or</span>
        </div>
        <div className={styles.account}>
          Don&apos;t have any account?{" "}
          <button 
            onClick={openRegisterModal}
          >
            Register</button>
        </div>

        <button onClick={onClose} className={styles.closeLogin}>x</button>
      </div>
    </section>
  )
}

export default LoginModal