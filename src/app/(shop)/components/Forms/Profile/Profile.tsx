"use client";
import { useUserStore } from "@/stores/userStore";
import styles from "./profile.module.css";
import useSWR from "swr";
import UpdateAvatar from "@/app/(shop)/components/Forms/Profile/UpdateAvatar";
import UpdateName from "@/app/(shop)/components/Forms/Profile/UpdateName";
import UpdateEmail from "@/app/(shop)/components/Forms/Profile/UpdateEmail";
import UpdateContact from "@/app/(shop)/components/Forms/Profile/UpdateContact";
import UpdateAddress from "@/app/(shop)/components/Forms/Profile/UpdateAddress";

const fetcher = async (url: string, accessToken: string | null) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  return res.json();
};

const Profile: React.FC = () => {
  const userStore = useUserStore();
  const userId = userStore.user?._id;
  const accessToken = userStore.accessToken;

  const { data: userData, error } = useSWR(
    userId
      ? `https://ecommerce-api-5ksa.onrender.com/api/v1/users/${userId}`
      : null,
    (url) => (url ? fetcher(url, accessToken) : null)
  );

  if (error) return <div>failed to load</div>;
  // userData will be undefined initially and will be updated once data is fetched
  if (!userData) return <div>loading...</div>;

  // console.log("User data:", userData);

  return (
    <section className={styles.profile}>

      <UpdateAvatar userData={userData} />

      <UpdateName userData={userData} />

      <UpdateEmail userData={userData} />

      <UpdateContact userData={userData} />

      <UpdateAddress userData={userData} />

    </section>
  );
};

export default Profile;
