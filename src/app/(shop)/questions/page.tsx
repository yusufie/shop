import Layout from "@/app/(shop)/components/Layout/Layout"
import Aside from '@/app/(shop)/components/Aside/Aside'
import Whishlist from "@/app/(shop)/components/Pages/Whishlist/Whishlist"

function QuestionsPage() {
    
  return (
    <Layout>
      <Aside>
        <Whishlist />
      </Aside>
    </Layout>
  )
}

export default QuestionsPage