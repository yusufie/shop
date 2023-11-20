import Layout from '@/app/(shop)/components/Layout/Layout'
import Aside from '@/app/(shop)/components/Aside/Aside'
import Orders from '@/app/(shop)/components/Orders/Orders'

function OrdersPage() {
  return (
    <Layout>
        <Aside>
          <Orders />
        </Aside>
    </Layout>
  )
}

export default OrdersPage