import Layout from '@/app/(shop)/components/Layout/Layout'
import Aside from '@/app/(shop)/components/Aside/Aside'
import Mobilenav from '@/app/(shop)/components/Mobilenav/Mobilenav'
import Orders from '@/app/(shop)/components/Orders/Orders'

export const dynamic = "force-dynamic";

function OrdersPage() {
  return (
    <Layout>

        <Aside>
          <Orders />
        </Aside>

        <Mobilenav />
    </Layout>
  )
}

export default OrdersPage