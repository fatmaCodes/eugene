import { useEffect, useState } from "react";
import Herosec from "../component/Herosec";
import Product from "../component/Product";
import changeLink from "../component/Navbar/changeLink";
import { useSelector } from "react-redux";
import database from "../backend/DataBase";
import { Query } from "appwrite";



function Homepage() {

  const userStatus = useSelector((state) => state.authReducer.userStatus)
  const userData = useSelector((state) => state.authReducer.userData)

  const [products,setProducts] = useState([]);

  async function loadProducts(){
    let _product = await database.getProducts([Query.limit(4)])
    
    setProducts(_product.documents)
  }
  
  useEffect(() => {
    changeLink("#home")
    loadProducts();
  }, [])
  
    return (
      <div className="flex flex-col gap-4 justify-start items-center">
        
        <div className="my-8">
        <h1 className="text-2xl text-slate-50 ">{userData?`Hey , ${userData?.name}`:""}</h1>
          <Herosec />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl">
            OUR BESTSELLERS
          </h1>
          <div className="flex justify-around gap-4 p-3">
          {products.map((product) => {
            return <Product key={product.$id} id={product.$id} name={product.product_name} price={product.price} img_id={product.product_image}/>
          })}
          </div>
        </div>

      </div>
    )

}

export default Homepage