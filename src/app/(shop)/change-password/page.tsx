import Layout from "@/app/(shop)/components/Layout/Layout"
import Aside from '@/app/(shop)/components/Aside/Aside'
import Change from "@/app/(shop)/components/Forms/Change/Change"

function ChangePage() {

  return (
    <Layout>
        <Aside>
          <Change />
        </Aside>
    </Layout>
  )
}

export default ChangePage