"use client";
import React, { useState } from "react";
import styles from "./resetpassword.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/utils/formSchema";
import { useSearchParams } from "next/navigation";
import AuthModal from "../Modals/Authorization/AuthModal";
const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      console.log('"token kontroll"', token);
      const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL+`/api/v1/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword }),
        }
      );

      if (response.ok) {
        alert("Password reset successful! , Please log in to continue ");
        setIsSuccess(true);
        console.log(response);
      } else {
        const data = await response.json();
        alert(data.message || "Password reset failed");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <section className={styles.resetPassword}>
      <div className={styles.container}>
        <h1>Reset Password</h1>
        <p>Password must be at least 8 characters</p>
        <form
          className={styles.resetPasswordForm}
          onSubmit={handleSubmit(handleChangePassword)}
        >
          <label htmlFor="password">New Password</label>
          <input
            id="password"
            {...register("password")}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {errors.password && (
            <span className={styles.error}>
              {errors.password.message as any}
            </span>
          )}

          <label htmlFor="passwordConfirm">Confirm New Password</label>
          <input
            id="passwordConfirm"
            {...register("passwordConfirm")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.passwordConfirm && (
            <span className={styles.error}>
              {errors.passwordConfirm.message as any}
            </span>
          )}

          <button className={styles.btn}>Save</button>
        </form>
      </div>
      {isSuccess && <AuthModal onClose={() => setIsSuccess(false)} />}
    </section>
  );
};

export default ResetPassword;
