import Layout from "@/app/(admin)/components/Layout/Layout"
import CategoryForm from "@/app/(admin)/components/Forms/Category/CategoryForm"

import { revalidateTag } from "next/cache";

async function getCategories() {
  // Cache data and tag it for revalidation
  const res = await fetch(
    "https://ecommerce-api-5ksa.onrender.com/api/v1/categories",
    {
      next: { tags: ["categoriesData"] },
    }
  );

  if (res.ok) {
    await revalidateTag("categoriesData"); // Revalidate the tagged cache entry
  }

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function CreatePage() {

  const categoriesData = await getCategories();
  // console.log(categoriesData)

  return (
    <Layout>
        <CategoryForm categoriesData={categoriesData} />
    </Layout>
  )
}

export default CreatePage