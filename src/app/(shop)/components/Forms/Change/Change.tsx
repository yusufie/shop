"use client";
import styles from "./change.module.css";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/utils/formSchema";
import { useState } from "react";
import eye from "../../../../../../public/icons/eye.svg";
import eyeClosed from "../../../../../../public/icons/eye-closed.svg";
import Image from "next/image";


type EyeStates = {
  oldPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
};

const Change: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmOldPassword, setConfirmOldPassword] = useState(false);
  const [closedEye, setClosedEye] = useState<EyeStates>({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const toggleEye = (field: keyof EyeStates) => {
    setClosedEye({
      ...closedEye,
      [field]: !closedEye[field],
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const resetForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (oldPassword === newPassword) {
      alert("New password cannot be the same as old password");
      return;
    }

    try {
      const user = localStorage.getItem("user");
      let userId;
      if (user) {
        const userData = JSON.parse(user);
        userId = userData._id;
      }
      const response = await fetch(
        `https://ecommerce-api-5ksa.onrender.com/api/v1/auth/change-password/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword,
          }),
        }
      );

      if (response.ok) {
        console.log(response);
        setConfirmOldPassword(false);
        setIsSuccess(true);
        resetForm();
      } else {
        setConfirmOldPassword(true);
        const data = await response.json();
        console.log("error", response);
        resetForm();
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };


  return (
    <section className={styles.change}>
      <form
        className={styles.changePassword}
        onSubmit={handleSubmit(handleChangePassword)}
      >
        <h1 className={styles.changeTitle}>Change Password</h1>
        {isSuccess && (
          <span className={styles.success}>Password changed successfully!</span>
        )}

        {confirmOldPassword && (
          <span className={styles.confirmOldPassword}>
            You must enter the old password correctly
          </span>
        )}

        <div className={styles.passwordField}>
          <label htmlFor="oldPassword">Old Password</label>
          <input
            id="oldPassword"
            type={closedEye.oldPassword ? "password" : "text"}
            {...register("oldPassword")}
            className={styles.passwordInput}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Image className={styles.eyeSvg} src={closedEye.oldPassword ? eyeClosed : eye} alt="eye" onClick={() => toggleEye('oldPassword')} />
          {errors.oldPassword && (
            <span className={styles.error}>
              {errors.oldPassword.message as any}
            </span>
          )}
        </div>

        <div className={styles.passwordField}>
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            type={closedEye.newPassword ? "password" : "text"}
            {...register("newPassword")}
            className={styles.passwordInput}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Image className={styles.eyeSvg} src={closedEye.newPassword ? eyeClosed : eye} alt="eye" onClick={() => toggleEye('newPassword')} />
          {errors.newPassword && (
            <span className={styles.error}>
              {errors.newPassword.message as any}
            </span>
          )}
        </div>

        <div className={styles.passwordField}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type={closedEye.confirmPassword ? "password" : "text"}
            {...register("confirmPassword")}
            className={styles.passwordInput}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
           <Image className={styles.eyeSvg} src={closedEye.confirmPassword ? eyeClosed : eye} alt="eye" onClick={() => toggleEye('confirmPassword')} />
          {errors.confirmPassword && (
            <span className={styles.error}>
              {errors.confirmPassword.message as any}
            </span>
          )}
        </div>

        <button className={styles.submitButton}>Submit</button>
      </form>
    </section>
  );
};

export default Change;
