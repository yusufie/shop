import Layout from "@/app/(shop)/components/Layout/Layout";
import Bag from "@/app/(shop)/components/Bag/Bag";
import HomeSlider from "@/app/(shop)/components/Sliders/Home/HomeSlider";
import Filterbox from "@/app/(shop)/components/Filterbox/Filterbox";
import Middlebar from "@/app/(shop)/components/Middlebar/Middlebar";
import images from "../../../public/datas/slider.json";
import Grocery from "@/app/(shop)/components/Heros/Grocery";
import Mobilenav from "@/app/(shop)/components/Mobilenav/Mobilenav";
import getCategories from "@/utils/getCategories";
import { revalidateTag } from "next/cache";

async function getData() {
  // Cache data and tag it for revalidation
  const res = await fetch( "https://ecommerce-api-5ksa.onrender.com/api/v1/products",
    { next: { tags: ["productData"] }, }
  );

  if (res.ok) { await revalidateTag("productData"); }

  if (!res.ok) { throw new Error("Failed to fetch data"); }

  return res.json();
}

export default async function Home() {
  const datas = await getData();
  // console.log(datas)
  const categories = await getCategories();
  // console.log(categories)

  return (
    <Layout>
      <Grocery />
      <Bag />
      <HomeSlider images={images} />
      <Middlebar />
      <Filterbox datas={datas} categories={categories} />
      <Mobilenav />
    </Layout>
  );
}
