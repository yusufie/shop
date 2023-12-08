import { revalidateTag } from "next/cache";

async function getCategoriesTree() {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/v1/categories/tree";

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