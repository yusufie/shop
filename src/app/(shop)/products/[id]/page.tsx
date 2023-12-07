import Layout from "@/app/(shop)/components/Layout/Layout";
import ProductDetails from "@/app/(shop)/components/Details/Product/ProductDetails";
import Bag from "@/app/(shop)/components/Bag/Bag";
import getCategories from "@/utils/getCategories";
import getProducts from "@/utils/getProducts";
// import { revalidateTag } from "next/cache";

// async function getProducts() {
//   // Cache data and tag it for revalidation
//   const res = await fetch( "https://ecommerce-api-5ksa.onrender.com/api/v1/products",
//     { next: { tags: ["productData"] }, }
//   );

//   if (res.ok) { await revalidateTag("productData"); }

//   if (!res.ok) { throw new Error("Failed to fetch data"); }

//   return res.json();
// }

async function generateStaticParams() {
  const products = await getProducts();
  const params = products.map((product : any) => ({
    params: { id: product.id.toString() },
  }));
  return params;
}

export async function getStaticPaths() {
  return {
    paths: await generateStaticParams(),
    fallback: false,
  };
}

export async function getStaticProps() {
  const products = await getProducts();
  const categories = await getCategories();
  return {
    props: {
      products,
      categories,
    },
    revalidate: 60,
  };
}

 function DynamicPage({ products , categories }: any) {
  return (
    <Layout>
      <ProductDetails products={products} categories={categories} />
      <Bag />
    </Layout>
  );
}

export default DynamicPage;

// async function DynamicPage() {

//   const products = await getProducts();
//   // console.log(products)

//   const categories = await getCategories();
//   // console.log(categories)

  
  
//   return (
//     <Layout>

//       <ProductDetails products={products} categories={categories} />
//       <Bag />

//     </Layout>
//   );
// }

// export default DynamicPage;
