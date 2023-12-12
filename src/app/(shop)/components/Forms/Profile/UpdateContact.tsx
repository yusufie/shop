"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from '@hookform/resolvers/zod';
// import { registerSchema } from '@/utils/formSchema'
import { useUserStore } from "@/stores/userStore";
import countryCodes from 'country-codes-list';
import styles from "./profile.module.css";

type FormValues = {
  contact: string;
  countryCode: string;
};

interface UpdateProps {
  userData: any;
}

const UpdateContact: React.FC<UpdateProps> = ({userData}) => {

  const userStore = useUserStore();

  // Destructuring user data for contact
  const { contact = [] } = userData || {};
  const defaultContact = contact.length > 0 ? contact[0] : {};
  // console.log("Contact:", contact);

  // Get country codes
  const countryList: any = countryCodes.customList(
    'countryCode' as any,
    '[{countryCode}] +{countryCallingCode}'
  ); // Generating the country code list
  // console.log("Country List:", countryList);

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
      const countryCodeNumber = data.countryCode.split(' ')[1];

      const userData = {
        contact: {
          type: 'string', // Update type based on your schema
          phone: {
            countryCode: countryCodeNumber, // Sending only the numeric part of the country code
            number: data.contact,
          },
        },
      };

      const userId = userStore.user?._id;
      const accessToken = userStore.accessToken;

      if (!userId || !accessToken) {
        console.error('User ID or access token not available');
        return;
      }

      console.log("Submitted Data:", userData);
      console.log("User ID:", userId);
      console.log("Access token:", accessToken);

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/contact/${userId}`;

      const response = await fetch(apiUrl,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      console.log("Response Status:", response.status);

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response Data:", responseData);
        alert("Update successful");
      } else {
        console.error("Failed to update. Status:", response.status);
        alert("Update failed");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <form className={styles.contactField} onSubmit={handleSubmit(onSubmit)}>

      <div className={styles.contactHeader}>
        <p>Contact Number</p>
        {/* <button className={styles.addButton}>+ Add</button> */}
      </div>

      <div className={styles.contactInfos}>
        <div>
          {/* <label htmlFor="countryCode">Country Code:</label> */}
          <Controller
            name="countryCode"
            control={control}
            defaultValue={defaultContact?.phone?.countryCode || ''}
            render={({ field }) => (
              <select id="countryCode" {...field} className={styles.countrySelect}>
                {Object.keys(countryList).map((code) => (
                  <option key={code} value={code.split(' ')[1]}>
                    {countryList[code]}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        <>
            <input 
              {...register("contact")} 
              id="contact" 
              defaultValue={defaultContact?.phone?.number || ''}
              className={styles.contactinput} 
            />
        </>

      </div>
        
      <button type="submit" value="submit" className={styles.updateButton}>Update</button>

    </form>
  )
};

export default UpdateContact;
