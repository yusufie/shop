"use client";
import { useUserStore } from "@/stores/userStore";
import useSWR from "swr";
import { useRouter } from "next/navigation";

import UpdateAvatar from "@/app/(shop)/components/Forms/Profile/UpdateAvatar";
import UpdateName from "@/app/(shop)/components/Forms/Profile/UpdateName";
import UpdateEmail from "@/app/(shop)/components/Forms/Profile/UpdateEmail";
import UpdateContact from "@/app/(shop)/components/Forms/Profile/UpdateContact";
import UpdateAddress from "@/app/(shop)/components/Forms/Profile/UpdateAddress";
import AuthModal from "@/app/(shop)/components/Modals/Authorization/AuthModal";
import styles from "./profile.module.css";
import CardLoading from "../../Modals/Loading/CardLoading";

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
  const router = useRouter();

  const { data: userData, error } = useSWR(
    userId
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}`
      : null,
    (url) => (url ? fetcher(url, accessToken) : null)
  );
  
  // Check if the user is logged in
  if (!userStore.isLoggedIn) {
    // Display AuthModal if the user is not logged in
    return <AuthModal onClose={() => router.push('/profile')} />;
  }

  if (error) return <div>failed to load</div>;
  // userData will be undefined initially and will be updated once data is fetched
  if (!userData) return <CardLoading />;

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
