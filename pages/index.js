import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts"; 
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({featuredProduct, newProducts}){

  

  console.log(newProducts)

  return(<div>


      <Header />  

      <Featured product= {featuredProduct} />   

      <NewProducts products = {newProducts} />  
      



  </div>)

}

export async function getServerSideProps(){

  const featuredProductId = '669e790dd100139cb4976cf0';

  await mongooseConnect();


  const featuredProduct = await Product.findById(featuredProductId);

  const newProducts = await Product.find({}, null, {sort: {'_id':-1}}); 

  return{

    props:{
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts))

    },
   

  }

}