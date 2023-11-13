"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/utils/formSchema'
import Image from 'next/image';
import styles from './registermodal.module.css'

interface RegisterModalProps {
  onClose: () => void;
}

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const RegisterModal = ({ onClose }: RegisterModalProps) => {

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
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      }
      console.log('Submitted Data:', userData);

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Response:', response);

      if (response.ok) {
        reset();
        alert('Registration successful');
      } else {
        alert('Registration failed');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <section className={styles.registermodal}>
      <div className={styles.registerModalContent}>
        {
          <Image
            className={styles.logo}
            src={"/images/logo.png"}
            alt="logo"
            width={160}
            height={26}
          />
        }
        <p>
          By signing up, you agree to our{" "}
          <span className={styles.termsPolicy}>terms</span> &{" "}
          <span className={styles.termsPolicy}>policy.</span>
        </p>

        <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.email}>
            <label htmlFor="name">Name</label>
            <input {...register("name")} id="name" placeholder="Enter your name..."/>
            {errors.name && <span className={styles.error}>{errors.name.message}</span>}
          </div>

          <div className={styles.email}>
            <label htmlFor="email">Email</label>
            <input {...register("email")} id="email" placeholder="Enter your email..."/>
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}  
          </div>

          <div className={styles.password}>
            <label htmlFor="password">Password:</label>
            <input {...register("password")} id="password" placeholder="Enter your password..."/>
            {errors.password && <span className={styles.error}>{errors.password.message}</span>}
          </div>

          <button type="submit" value="submit" className={styles.btn}>
            Register
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