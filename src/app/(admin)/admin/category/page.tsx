import Category from "@/app/(admin)/components/Category/Category";
import Layout from "@/app/(admin)/components/Layout/Layout";
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
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function CategoryPage() {
  const categories = await getCategories();
  console.log("hello hello:", categories);

  return (
    <Layout>
      <Category categories={categories} />
    </Layout>
  );
}

export default CategoryPage;
