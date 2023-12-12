import { revalidateTag } from "next/cache";

async function getCategories() {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/v1/categories";

  try {
    const res = await fetch(apiUrl, { next: { tags: ['categories'] } });

    if (res.ok) {
      revalidateTag('categories');
    } else {
      throw new Error('Failed to fetch categories data');
    }

    return res.json();
  } catch (error: any) {
    console.error('Error fetching categories data:', error.message);
    // Handle the error gracefully (e.g., show a user-friendly message)
    throw error;
  }
}

export default getCategories;
