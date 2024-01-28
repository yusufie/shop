import Layout from "@/app/(shop)/components/Layout/Layout";
import Bag from "@/app/(shop)/components/Bag/Bag";
import HomeSlider from "@/app/(shop)/components/Sliders/Home/HomeSlider";
import Filterbox from "@/app/(shop)/components/Filterbox/Filterbox";
import images from "../../../public/datas/slider.json";
import Grocery from "@/app/(shop)/components/Heros/Grocery";
import Mobilenav from "@/app/(shop)/components/Mobilenav/Mobilenav";
import Guarantee from "@/app/(shop)/components/Guarantee/Guarantee";
import getCategories from "@/utils/getCategories";
import getCategoriesTree from "@/utils/getCategoriesTree";

export default async function Home() {

  const categories = await getCategories();
  // console.log(categories)
  const tree = await getCategoriesTree();
  //  console.log("tree:", tree)

  return (
    <Layout>
      <Grocery />
      <Bag />
      <HomeSlider images={images} />
      <Filterbox 
        categories={categories} 
        tree={tree} 
      />
      <Guarantee />
      <Mobilenav />
    </Layout>
  );
}
