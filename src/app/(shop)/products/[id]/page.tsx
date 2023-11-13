import Layout from "@/app/(shop)/components/Layout/Layout";
import ProductDetails from "@/app/(shop)/components/Details/Product/ProductDetails";
import Bag from "@/app/(shop)/components/Bag/Bag";

function DynamicPage() {
  
  return (
    <Layout>

      <ProductDetails />
      <Bag />

    </Layout>
  );
}

export default DynamicPage;
