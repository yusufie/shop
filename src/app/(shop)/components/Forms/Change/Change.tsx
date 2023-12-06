"use client";
import styles from './change.module.css'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/utils/formSchema";
import { useState } from 'react';
const Change: React.FC = () => {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });


  const handleChangePassword = (e:any) => {
    e.preventDefault();
    
    console.log("Change Password");
  }


  return (
    <section className={styles.change}>
      <form className={styles.changePassword} onSubmit={handleSubmit(handleChangePassword)} >

        <h1 className={styles.changeTitle}>Change Password</h1>

        <div className={styles.passwordField}>
          <label htmlFor="old">Old Password</label>
          <input id="oldPassword"
          {...register("oldPassword")}
            className={styles.passwordInput}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            />
            {errors.oldPassword && (
            <span className={styles.error}>
              {errors.oldPassword.message as any}
            </span>
          )}
        </div>

        <div className={styles.passwordField}>
          <label htmlFor="new">New Password</label>
          <input id="newPassword"
          {...register("newPassword")}
            className={styles.passwordInput}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            />
            {errors.password && (
            <span className={styles.error}>
              {errors.password.message as any}
            </span>
          )}
        </div>

        <div className={styles.passwordField}>
          <label htmlFor="confirm">Confirm Password</label>
          <input id="confirmPassword"
          {...register("confirmPassword")}
            className={styles.passwordInput}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
                {errors.passwordConfirm && (
            <span className={styles.error}>
              {errors.passwordConfirm.message as any}
            </span>
          )}

        </div>

        <button className={styles.submitButton}>Submit</button>

      </form>
      
    </section>
  )
}

export default Change