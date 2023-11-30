'use client';
import React, { useState } from 'react'
import styles from './resetpassword.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/utils/formSchema';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleChangePassword = async (e:any) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      console.log('"token kontroll"', token);
      const response = await fetch(`https://ecommerce-api-5ksa.onrender.com/api/v1/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        alert('Password reset successful!');
      } else {
        const data = await response.json();
        alert(data.message || 'Password reset failed');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };
  return (
   <section className={styles.resetPassword}>
    <div className={styles.container}>
    <h1>Reset Password</h1>
     <p>Password must be at least 8 characters</p>
     <form className={styles.resetPasswordForm} onSubmit={handleSubmit(handleChangePassword)}>
        <label htmlFor="password">New Password</label>
        <input type="password" id='password'  {...register('password')} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        {errors.password && <span className={styles.error}>{errors.password.message as any}</span>}

        <label htmlFor="passwordConfirm">Confirm New Password</label>
        <input type="password" id='passwordConfirm'  {...register('passwordConfirm')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        {errors.passwordConfirm && <span className={styles.error}>{errors.passwordConfirm.message as any}</span>}

        <button className={styles.btn}>Save</button>
     </form>
    </div>
   </section>
  )
}

export default ResetPassword