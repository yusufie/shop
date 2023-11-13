import Navbar from "@/app/(admin)/components/Navbar/Navbar";
import Sidebar from "@/app/(admin)/components/Sidebar/Sidebar";
import ProductFunc from "../services/ProductFunc";




export default function Home() {
  return (
   <>
    <Navbar/>
    <Sidebar/>
    <ProductFunc/>
   </>
  )
}
