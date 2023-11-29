import Layout from '@/app/(shop)/components/Layout/Layout'
import Aside from '@/app/(shop)/components/Aside/Aside'
import Whishlist from "@/app/(shop)/components/Whishlist/Whishlist"
import getProducts from "@/utils/getProducts";

export const dynamic = "force-dynamic";

async function WishlistsPage() {

  const products = await getProducts();
  console.log("products:", products);

  return (
    <Layout>
        <Aside>
          <Whishlist products={products} />
        </Aside>
    </Layout>
  )
}

export default WishlistsPage