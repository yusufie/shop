import { revalidateTag } from "next/cache";

async function getSubCategories() {
  // Cache data and tag it for revalidation
  const res = await fetch(
    "https://ecommerce-api-5ksa.onrender.com/api/v1/subcategories",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const data = await res.json();

  revalidateTag("subcategories");
  return data.subCategories;
}

export default getSubCategories;