import { revalidateTag } from "next/cache";

async function getCategories() {
  // Cache data and tag it for revalidation
  const res = await fetch(
    "https://ecommerce-api-5ksa.onrender.com/api/v1/categories",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (res.status !== 200) {
    throw new Error("Something went wrong");
  }


  const data = await res.json();



  revalidateTag("categories");


  return data.categories;

}

export default getCategories;
