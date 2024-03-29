"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from '@hookform/resolvers/zod';
// import { registerSchema } from '@/utils/formSchema'
import { useUserStore } from "@/stores/userStore";
import countryCodes from 'country-codes-list';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./profile.module.css";

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

const UpdateContact: React.FC<UpdateProps> = ({userData}) => {

  const userStore = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Destructuring user data for contact
  const { contact = [] } = userData || {};
  const defaultContact = contact.length > 0 ? contact[0] : {};

  // console.log("Default Contact:", defaultContact);
  // console.log("Country Code:", defaultContact?.phone?.countryCode);

  // Get country codes
  const countryList:CountryList = countryCodes.customList('countryCode' as any, '[{countryCode}] +{countryCallingCode}');

  const getSelectedCountryCode = () => {
    const selectedCountryCode = defaultContact?.phone?.countryCode || '+672'; // Set a default value if not available
    const selectedCode = Object.entries(countryList).find(([key, value]) => value.includes(selectedCountryCode));
    return selectedCode ? selectedCode[0] : '';
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
      setIsSubmitting(true);

      // Extracting only the numeric part from the countryCode
      const selectedCountryCode = data.countryCode;
      const selectedCountryCallingCode = countryList[selectedCountryCode].replace(`[${selectedCountryCode}] +`, '+');

      const userData = {
        contact: {
          type: 'string', // Update type based on your schema
          phone: {
            countryCode: selectedCountryCallingCode, 
            number: data.contact,
          },
        },
      };

      const userId = userStore.user?._id;
      const accessToken = userStore.accessToken;

      if (!userId || !accessToken) {
        toast.error('User ID or access token is not available');
        // console.error('User ID or access token not available');
        return;
      }

      console.log("Submitted Data:", userData);
      console.log("User ID:", userId);

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
        toast.success('Update successful');
      } else {
        console.error("Failed to update. Status:", response.status);
        toast.error('Update failed');
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setIsSubmitting(false); // Re-enable submit button
    }
  };

  return (
    <>
    <form className={styles.contactField} onSubmit={handleSubmit(onSubmit)}>

      <div className={styles.contactHeader}>
        <p>Contact Number</p>
        {/* <button className={styles.addButton}>+ Add</button> */}
      </div>

      <div className={styles.contactInfos}>
          {/* <label htmlFor="countryCode">Country Code:</label> */}
          <Controller
              name="countryCode"
              control={control}
              defaultValue={getSelectedCountryCode()}
              render={({ field }) => (
                <select id="countryCode" {...field} className={styles.countrySelect}>
                  {Object.entries(countryList).map(([code, label]) => (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  ))}
                </select>
              )}
            />

            <input 
              {...register("contact")} 
              id="contact" 
              defaultValue={defaultContact?.phone?.number || ''}
              className={styles.contactinput} 
            />

      </div>
        
      <button type="submit" value="submit" disabled={isSubmitting}
            className={`${styles.updateButton} ${isSubmitting ? styles.loading : ''}`}>
              {isSubmitting ? (
                <>
                  <span className={styles.spinner} /> {/* spinner */}
                  <span>Updating...</span> {/* while submitting */}
                </>
              ) : (
                <span>Update</span>
              )}
      </button>

    </form>
    
    <ToastContainer />
    </>
  )
};

export default UpdateContact;
