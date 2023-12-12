"use client";
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/utils/formSchema'
import Image from 'next/image';
import styles from './forgotmodal.module.css'

interface ForgotModalProps {
  onClose: () => void;
}

type FormValues = {
  email: string;
};

const ForgotPasswordModal = ({ onClose }: ForgotModalProps) => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

    // send data to the "/api/v1/auth/forgot-password" route
    const onSubmit = async (data: FormValues,) => {
        
        try {
          setIsSubmitting(true);
    
          const userData = {
            email: data.email,
          }
          console.log('Submitted Data:', userData);
    
          const response = await fetch('https://ecommerce-api-5ksa.onrender.com/api/v1/auth/forgot-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
    
          console.log('Response:', response);
    
          if (response.ok) {
            reset();
            onClose();          
            alert('Email sent! Please check your inbox for the reset link.')
          } else {
            const data = await response.json();
            console.log(data);
            alert(data.message);
          }

        } catch (error) {
          console.log(error);
        } finally {
          setIsSubmitting(false);
        }

    }

  return (
    <section className={styles.forgotmodal}>
      <div className={styles.forgotModalContent}>
      {
          <Image
          className={styles.logo}
          src={"/images/grand.png"}
          alt="logo"
          width={163} height={45}
        />
        }
        <p>We will send you a link to reset your password</p>

        <form className={styles.forgotForm} onSubmit={handleSubmit(onSubmit)}>

        <div className={styles.email}>
          <label htmlFor="email">Email</label>
          <input {...register("email")} id="email" placeholder="Enter your email..."/>
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>

        <button type="submit" value="submit" disabled={isSubmitting}
            className={`${styles.btn} ${isSubmitting ? styles.loading : ''}`}>
              {isSubmitting ? (
                <>
                  <span className={styles.spinner} /> {/* spinner */}
                  <span>Submiting...</span> {/* while submitting */}
                </>
              ) : (
                <span>Submit Email</span>
              )}
          </button>

        </form>

        <div className={styles.horizontal}>
          <hr />
          <span>Or</span>
        </div>

        <div className={styles.account}>
          Back to <button onClick={onClose}>Login</button>
        </div>

        <button onClick={onClose} className={styles.closeForgot}>x</button>
      </div>
    </section>
  )
}

export default ForgotPasswordModal