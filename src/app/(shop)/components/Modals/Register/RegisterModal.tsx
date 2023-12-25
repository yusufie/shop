"use client";
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/utils/formSchema'
import Image from 'next/image';
import styles from './registermodal.module.css'
import eye from "../../../../../../public/icons/eye.svg";
import closedeye from "../../../../../../public/icons/eye-closed.svg";

interface RegisterModalProps {
  onClose: () => void;
}

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

type EyeStates = {
  password: boolean;
  confirmPassword: boolean;
};

const RegisterModal = ({ onClose }: RegisterModalProps) => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState<EyeStates>({
    password: true,
    confirmPassword: true,
  });

  const togglePasswordVisibility = (field: keyof EyeStates) => {
    setPasswordVisibility({
      ...passwordVisibility,
      [field]: !passwordVisibility[field],
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
  });

  // send data to the "/api/users" route
  const onSubmit = async (data: FormValues,) => {

    try {
      setIsSubmitting(true);

      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      }
      console.log('Submitted Data:', userData);

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`;
      
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
        // Close the modal or navigate to another page
        onClose();
        alert('Registration successful!')

      } else {
        alert('Registration failed');
      }

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false); // Re-enable submit button
  }
  }

  return (
    <section className={styles.registermodal}>
      <div className={styles.registerModalContent}>
        {
          <Image
          className={styles.logo}
          src={"/images/grand.png"}
          alt="logo"
          width={163} height={45}
        />
        }
        <p>
          By signing up, you agree to our{" "}
          <span className={styles.termsPolicy}>terms</span> &{" "}
          <span className={styles.termsPolicy}>policy.</span>
        </p>

        <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.email}>
            <label htmlFor="firstName">First Name</label>
            <input {...register("firstName")} id="firstName" placeholder="Enter your first name..."/>
            {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
          </div>

          <div className={styles.email}>
            <label htmlFor="lastName">Last Name</label>
            <input {...register("lastName")} id="lastName" placeholder="Enter your last name..."/>
            {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
          </div>

          <div className={styles.email}>
            <label htmlFor="email">Email</label>
            <input {...register("email")} id="email" placeholder="Enter your email..."/>
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}  
          </div>

          <div className={styles.password}>
            <label htmlFor="password">Password:</label>
            <input {...register("password")} id="password" placeholder="Enter your password..." type={passwordVisibility.password ? "password" : "text"} />
            <Image onClick={() =>togglePasswordVisibility('password')} className={styles.eyeIcons} src={passwordVisibility.password ? closedeye : eye} alt="eye"/>
            {errors.password && <span className={styles.error}>{errors.password.message}</span>}
          </div>

          <div className={styles.password}>
            <label htmlFor="passwordConfirmation">Confirm Password:</label>
            <input {...register("passwordConfirmation")} id="passwordConfirmation" placeholder="Confirm your password..." type={passwordVisibility.confirmPassword ? "password" : "text"} />
            <Image onClick={() => togglePasswordVisibility('confirmPassword')} className={styles.eyeIcons} src={passwordVisibility.confirmPassword ? closedeye : eye} alt="eye"/>
            {errors.passwordConfirmation && <span className={styles.error}>{errors.passwordConfirmation.message}</span>}
          </div>

          <button type="submit" value="submit" disabled={isSubmitting}
            className={`${styles.btn} ${isSubmitting ? styles.loading : ''}`}>
              {isSubmitting ? (
                <>
                  <span className={styles.spinner} /> {/* spinner */}
                  <span>Registering...</span> {/* while submitting */}
                </>
              ) : (
                <span>Register</span>
              )}
          </button>

        </form>

        <div className={styles.horizontal}>
          <hr />
          <span>Or</span>
        </div>

        <div className={styles.account}>
          Already have an account?{" "}
          <button onClick={onClose}>Login</button>
        </div>

        <button onClick={onClose} className={styles.closeRegister}>x</button>
      </div>
    </section>
  )
}

export default RegisterModal