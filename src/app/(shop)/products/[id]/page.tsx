import Layout from "@/app/(shop)/components/Layout/Layout";
import ProductDetails from "@/app/(shop)/components/Details/Product/ProductDetails";
import Bag from "@/app/(shop)/components/Bag/Bag";
import getProducts from "@/utils/getProducts";
import getCategories from "@/utils/getCategories";

async function DynamicPage() {

  const products = await getProducts();
  // console.log("products:", products)

  const categories = await getCategories();
  // console.log(categories)
  
  return (
    <Layout>

      <ProductDetails products={products} categories={categories} />
      <Bag />

    </Layout>
  );
}

export default DynamicPage;