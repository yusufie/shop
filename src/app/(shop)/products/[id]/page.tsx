import Layout from "@/app/(shop)/components/Layout/Layout";
import ProductDetails from "@/app/(shop)/components/Details/Product/ProductDetails";
import Bag from "@/app/(shop)/components/Bag/Bag";
import getCategories from "@/utils/getCategories";
import { revalidateTag } from "next/cache";

async function getProducts() {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/v1/products";

  try {
    const res = await fetch(apiUrl, { next: { tags: ['products'] } });

    if (res.ok) {
      revalidateTag('products');
    } else {
      throw new Error('Failed to fetch products data');
    }

    return res.json();
  } catch (error: any) {
    console.error('Error fetching products data:', error.message);
    // Handle the error gracefully (e.g., show a user-friendly message)
    throw error;
  }
}

async function DynamicPage() {

  const products = await getProducts();
  // console.log(products)

  const categories = await getCategories();
  // console.log(categories)
  
  return (
    <Layout>

      <ProductDetails products={products} categories={categories} />
      <Bag />

    </Layout>
  );
}

export default DynamicPage;