import Layout from '@/app/(shop)/components/Layout/Layout'
import Aside from '@/app/(shop)/components/Aside/Aside'
import Mobilenav from '@/app/(shop)/components/Mobilenav/Mobilenav'
import Profile from "@/app/(shop)/components/Forms/Profile/Profile"

export const dynamic = "force-dynamic";

function ProfilePage() {
  return (
    <Layout>

        <Aside>
          <Profile />
        </Aside>

        <Mobilenav />
    </Layout>
  )
}

export default ProfilePage