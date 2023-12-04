"use client";
import React from 'react'
import styles from "./profile.module.css";
import Avatar from '@/app/(shop)/components/Forms/Profile/Avatar';
import UpdateName from '@/app/(shop)/components/Forms/Profile/UpdateName';
import UpdateEmail from '@/app/(shop)/components/Forms/Profile/UpdateEmail';
import UpdateContact from '@/app/(shop)/components/Forms/Profile/UpdateContact';
import UpdateAddress from '@/app/(shop)/components/Forms/Profile/UpdateAddress';

const Profile: React.FC = () => {
  return (
    <section className={styles.profile}>

      <Avatar />

      <UpdateName />

      <UpdateEmail />

      <UpdateContact />

      <UpdateAddress />

    </section>
  )
}

export default Profile