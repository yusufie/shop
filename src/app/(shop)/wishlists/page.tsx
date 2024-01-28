import Layout from '@/app/(shop)/components/Layout/Layout'
import Aside from '@/app/(shop)/components/Aside/Aside'
import Mobilenav from '@/app/(shop)/components/Mobilenav/Mobilenav'
import Whishlist from "@/app/(shop)/components/Whishlist/Whishlist"
import Bag from "@/app/(shop)/components/Bag/Bag";

export const dynamic = "force-dynamic";

async function WishlistsPage() {

  return (
    <Layout>

        <Aside>
          <Whishlist />
          <Bag />
        </Aside>

        <Mobilenav />

    </Layout>
  )
}

export default WishlistsPage