"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from '@hookform/resolvers/zod';
// import { registerSchema } from '@/utils/formSchema'
import { useUserStore } from "@/stores/userStore";
import countryCodes from "country-codes-list";
import styles from "./profile.module.css";
import { ToastContainer, toast } from "react-toastify";

type FormValues = {
  contact: string;
  countryCode: string;
};

interface UpdateProps {
  userData: any;
}

interface CountryList {
  [key: string]: string;
}

const Contact: React.FC<UpdateProps> = ({ userData }) => {
  // console.log("useData", userData);
  const userStore = useUserStore();

  // Destructuring user data for contact
  const contact = userData.contact[0];
  const defaultContact = contact.phone.number;
  
  console.log("contact", contact);
  console.log("defaultContact:", defaultContact);

  // Get country codes
  const countryList: CountryList = countryCodes.customList(
    "countryCode" as any,
    "[{countryCode}] +{countryCallingCode}"
  );

  // Access the country code directly from userData if available
  const defaultCountryCode = userData.contact[0]?.phone?.countryCode || "+672";

  const getSelectedCountryCode = () => {
    const selectedCode = Object.entries(countryList).find(([key, value]) =>
      value.includes(defaultCountryCode)
    );
    return selectedCode ? selectedCode[0] : "";
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    // resolver: zodResolver(registerSchema),
  });

  // send data to the "/api/v1/profile/contact/{userId}" route
  const onSubmit = async (data: FormValues) => {
    try {
      // Extracting only the numeric part from the countryCode
      const selectedCountryCode = data.countryCode;
      const selectedCountryCallingCode = countryList[
        selectedCountryCode
      ].replace(`[${selectedCountryCode}] +`, "+");

      const userData = {
        contact: {
          type: "string", // Update type based on your schema
          phone: {
            countryCode: selectedCountryCallingCode, // Sending only the numeric part of the country code
            number: data.contact,
          },
        },
      };

      const userId = userStore.user?._id;
      const accessToken = userStore.accessToken;

      if (!userId || !accessToken) {
        console.error("User ID or access token not available");
        return;
      }

      // console.log("Submitted Data:", userData);
      // console.log("User ID:", userId);
      // console.log("Access token:", accessToken);

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/contact/${userId}`;

      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("Response Status:", response.status);

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response Data:", responseData);
        toast.success("Update successful");
      } else {
        console.error("Failed to update. Status:", response.status);

        toast.error("Update failed");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <form className={styles.contactField} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.contactHeader}>
        <div>
          <span className={styles.serial}>1</span>
          <span className={styles.title}>Contact Number</span>
        </div>
        <button type="submit" value="submit" className={styles.addButton}>
          Update
        </button>

        {/* <button className={styles.addButton}> +Update</button> */}
      </div>

      <div className={styles.contactInfos}>
        <div>
          {/* <label htmlFor="countryCode">Country Code:</label> */}
          <Controller
            name="countryCode"
            control={control}
            defaultValue={getSelectedCountryCode()}
            render={({ field }) => (
              <select
                id="countryCode"
                {...field}
                className={styles.countrySelect}
              >
                {Object.entries(countryList).map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        <input
          {...register("contact")}
          id="contact"
          defaultValue={defaultContact || ""}
          className={styles.contactinput}
        />
      </div>

      <ToastContainer />
    </form>
  );
};

export default Contact;
