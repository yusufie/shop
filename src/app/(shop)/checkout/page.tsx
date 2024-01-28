import Layout from "@/app/(shop)/components/Layout/Layout"
import Mobilenav from '@/app/(shop)/components/Mobilenav/Mobilenav'
import Checkout from "@/app/(shop)/components/Checkout/Checkout"

//make page dynamic force in nextjs
export const dynamic = 'force-dynamic'

function CheckoutPage() {

  return (

    <Layout>

      <Checkout />

      <Mobilenav />

    </Layout>

  )
}

export default CheckoutPage