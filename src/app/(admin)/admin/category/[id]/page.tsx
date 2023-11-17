import Layout from "@/app/(admin)/components/Layout/Layout"
import CategoryUpdate from "@/app/(admin)/components/Forms/CategoryUpdate/CategoryUpdate"
import { revalidateTag } from "next/cache";

async function getCategory(id:any) {
  // Cache data and tag it for revalidation
  const res = await fetch(
    `https://ecommerce-api-5ksa.onrender.com/api/v1/categories/${id}`,
    {
      next: { tags: ["categoryData"] },
    }
  );

  if (res.ok) {
    await revalidateTag("categoryData"); // Revalidate the tagged cache entry
  }

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function DynamicPage({ params }: any) {

  console.log(params.id)

  const categoryData = await getCategory(params.id);
  console.log(categoryData);

  return (
    <Layout>
      <CategoryUpdate categoryData={categoryData}/>
    </Layout>
  )
}

export default DynamicPage