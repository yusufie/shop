import Layout from "@/app/(admin)/components/Layout/Layout"
import CategoryForm from "@/app/(admin)/components/Forms/Category/CategoryForm"
import getCategories from "@/utils/getCategories";

async function CreatePage() {

  const categoriesData = await getCategories();
  // console.log("categoriesData:", categoriesData)

  return (
    <Layout>
        <CategoryForm categoriesData={categoriesData} />
    </Layout>
  )
}

export default CreatePage