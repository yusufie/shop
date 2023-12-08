import { revalidateTag } from "next/cache";

async function getSubCategories() {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/v1/subcategories";

  try {
    const res = await fetch(apiUrl, { next: { tags: ['subcategories'] } });

    if (res.ok) {
      revalidateTag('subcategories');
    } else {
      throw new Error('Failed to fetch subcategories data');
    }

    return res.json();
  } catch (error: any) {
    console.error("Error fetching subcategories data:", error.message);
    // Handle the error gracefully (e.g., show a user-friendly message)
    throw error;
  }
}

export default getSubCategories;