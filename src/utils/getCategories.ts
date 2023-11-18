import { revalidateTag } from "next/cache";

async function getCategories() {
  // Cache data and tag it for revalidation
  const res = await fetch(
    "https://ecommerce-api-5ksa.onrender.com/api/v1/categories",
    { next: { tags: ["categories"] } }
  );

  if (res.ok) {
    await revalidateTag("categories");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default getCategories;
