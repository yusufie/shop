import Layout from '@/app/(shop)/components/Layout/Layout'
import Mobilenav from '@/app/(shop)/components/Mobilenav/Mobilenav'
import Faq from '@/app/(shop)/components/Faq/Faq'

function Help() {
  return (
    <Layout>
        <Faq />
        <Mobilenav />
    </Layout>
  )
}

export default Help