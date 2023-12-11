"use client";
import React from 'react'
import styles from "./profile.module.css";
import UpdateAvatar from '@/app/(shop)/components/Forms/Profile/UpdateAvatar';
import UpdateName from '@/app/(shop)/components/Forms/Profile/UpdateName';
import UpdateEmail from '@/app/(shop)/components/Forms/Profile/UpdateEmail';
import UpdateContact from '@/app/(shop)/components/Forms/Profile/UpdateContact';
import UpdateAddress from '@/app/(shop)/components/Forms/Profile/UpdateAddress';

const Profile: React.FC = () => {
  return (
    <section className={styles.profile}>

      <UpdateAvatar />

      <UpdateName />

      <UpdateEmail />

      <UpdateContact />

      <UpdateAddress />

    </section>
  )
}

export default Profile