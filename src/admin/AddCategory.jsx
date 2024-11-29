import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import conf from "../conf/conf";
import CategoryRow from "./CategoryRow";
import database from "../backend/DataBase";
import { Query } from "appwrite";

function AdminProduct() {

    const userData = useSelector((state) => state.authReducer.userData);

    const [categories,setCategory] = useState([])

    const navigate = useNavigate()

    async function loadCategories() {
      const _category = await database.getCategories([Query.limit(5000)]);

      setCategory(_category.documents)
    }
  
    useEffect(() => {
      if (userData.$id != conf.adminId) {
        alert("you are not admin")
        navigate("/")
      }

      loadCategories()


    }, [userData])

  return (
    <div className="flex-grow" >
    <div>
      <h1 className="text-center text-2xl p-8">
        OUR CATEGORIES
      </h1>
    </div>
    <div className="border-2 border-black p-5 flex flex-col gap-3 overflow-scroll">
      {categories.map((category,index)=>{
          return <CategoryRow key={category.$id} index={index+1} name={category.category_name} categ={category.category_text} id={category.$id} img_id={category.category_image}/>
      })}

      <div className="p-3 w-full flex justify-center">
          <button onClick={()=>navigate("/admin/addCategoryForm")} className="bg-amber-400 p-3 rounded-xl text-white">
          ADD CATEGORY  
          </button>              
      </div>                

    </div>
  </div>
  )
}

export default AdminProduct