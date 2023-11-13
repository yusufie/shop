import Layout from '@/app/(shop)/components/Layout/Layout'
import Bag from '@/app/(shop)/components/Bag/Bag'
import HomeSlider from '@/app/(shop)/components/Sliders/Home/HomeSlider'
import Filterbox from '@/app/(shop)/components/Filterbox/Filterbox'
import Middlebar from '@/app/(shop)/components/Middlebar/Middlebar'
import images from '../../../public/datas/slider.json'
import Grocery from '@/app/(shop)/components/Heros/Grocery'
import Mobilenav from '@/app/(shop)/components/Mobilenav/Mobilenav'

export default function Home() {

  return (
    <Layout >
      <Grocery />
      <Bag />
      <HomeSlider images={images} />
      <Middlebar />
      <Filterbox />
      <Mobilenav />
    </Layout>

  )
}
