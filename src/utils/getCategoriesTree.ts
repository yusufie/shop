import { revalidateTag } from "next/cache";

async function getCategoriesTree() {

  const apiUrl = "https://ecommerce-api-5ksa.onrender.com/api/v1/categories/tree";

  try {
    const res = await fetch(apiUrl, { next: { tags: ['categoriestree'] } });

    if (res.ok) {
      revalidateTag('categoriestree');
    } else {
      throw new Error('Failed to fetch categoriestree data');
    }

    return res.json();
  } catch (error: any) {
    console.error('Error fetching categoriestree data:', error.message);
    // Handle the error gracefully (e.g., show a user-friendly message)
    throw error;
  }
}

export default getCategoriesTree;