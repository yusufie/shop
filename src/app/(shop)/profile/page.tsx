import Layout from '@/app/(shop)/components/Layout/Layout'
import Aside from '@/app/(shop)/components/Aside/Aside'
import Profile from "@/app/(shop)/components/Forms/Profile/Profile"

function ProfilePage() {
  return (
    <Layout>
        <Aside>
          <Profile />
        </Aside>
    </Layout>
  )
}

export default ProfilePage