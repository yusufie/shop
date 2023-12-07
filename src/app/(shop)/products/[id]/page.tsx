import Layout from "@/app/(shop)/components/Layout/Layout";
// import ProductDetails from "@/app/(shop)/components/Details/Product/ProductDetails";
import Bag from "@/app/(shop)/components/Bag/Bag";
// import getCategories from "@/utils/getCategories";
/* import { revalidateTag } from "next/cache";

async function getProducts() {
  // Cache data and tag it for revalidation
  const res = await fetch( "https://ecommerce-api-5ksa.onrender.com/api/v1/products",
    { next: { tags: ["productData"] }, }
  );

  if (res.ok) { await revalidateTag("productData"); }

  if (!res.ok) { throw new Error("Failed to fetch data"); }

  return res.json();
} */

async function DynamicPage() {

  // const products = await getProducts();
  // console.log(products)

  // const categories = await getCategories();
  // console.log(categories)
  
  return (
    <Layout>

      {/* <ProductDetails products={products} categories={categories} /> */}
      <Bag />

    </Layout>
  );
}

export default DynamicPage;
