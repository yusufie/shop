import Layout from "@/app/(shop)/components/Layout/Layout";
import Bag from "@/app/(shop)/components/Bag/Bag";
import HomeSlider from "@/app/(shop)/components/Sliders/Home/HomeSlider";
import Filterbox from "@/app/(shop)/components/Filterbox/Filterbox";
import Middlebar from "@/app/(shop)/components/Middlebar/Middlebar";
import images from "../../../public/datas/slider.json";
import Grocery from "@/app/(shop)/components/Heros/Grocery";
import Mobilenav from "@/app/(shop)/components/Mobilenav/Mobilenav";
import getCategories from "@/utils/getCategories";
import getSubCategories from "@/utils/getSubCategories";

import { revalidateTag } from "next/cache";

async function getData() {
  // Cache data and tag it for revalidation
  // get products from api and cache it for 1 hour (3600 seconds) and tag it with "products" tag for revalidation 
  const res = await fetch("https://ecommerce-api-5ksa.onrender.com/api/v1/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status !== 200) {
    throw new Error("Failed to fetch products");
  }

  revalidateTag("products");

  const data = await res.json();

  return data.products;
}

export default async function Home() {
  const products = await getData();
  console.log({ products });
  const categories = await getCategories();
  console.log({ categories });
  const subCategories = await getSubCategories();
  console.log({ subCategories });



  return (
    <Layout>
      <Grocery />
      <Bag />
      <HomeSlider images={images} />
      <Middlebar />
      <Filterbox products={products} categories={categories} subCategories={subCategories} />
      <Mobilenav />
    </Layout>
  );
}
