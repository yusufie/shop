import { revalidateTag } from "next/cache";

async function getSubCategories() {
  // Cache data and tag it for revalidation
  const res = await fetch(
    "https://ecommerce-api-5ksa.onrender.com/api/v1/subcategories",
    { next: { tags: ["subcategories"] } }
  );

  if (res.ok) {
    await revalidateTag("subcategories");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default getSubCategories;