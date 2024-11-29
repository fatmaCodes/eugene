import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import database from "../backend/DataBase"
import conf from "../conf/conf";
import { useForm } from "react-hook-form";
import { Query } from "appwrite";

function AddProduct() {

    const userData = useSelector((state) => state.authReducer.userData);

    const navigate = useNavigate();

    const {handleSubmit,register,reset} = useForm()

    const [categories,setCategory] = useState([])

    async function loadCategories() {
      const _category = await database.getCategories([Query.limit(5000)]);

      setCategory(_category.documents)
    }
  

    async function handleAddProduct(data){
        
        const img = await database.uploadFile(data.product_image[0]);

        if(img)
        {
            const imgId = img.$id
            const newProduct = await database.addProduct({...data,product_image:imgId})
            if (newProduct) {
                reset(data)
                alert("product added succesfully!");
                navigate("/admin/categories")
            }else{
                alert("failed to add try again!");
            }
        }
        else
        {
            alert("file upload error try again!");
        }

    }


    useEffect(() => {
        if (userData.$id != conf.adminId) {
          alert("you are not admin")
          navigate("/")
        }
        loadCategories()
      }, [userData])
  

  return (
    <div className="flex-grow">
        <h1 className="p-4 text-xl ">
            Add Products
        </h1>
        <form onSubmit={handleSubmit(handleAddProduct)}>
            <div className="p-2 flex gap-2 it items-center">
                <label htmlFor="name">PRODUCT NAME:</label>
                <input type="text"  name="name" className="p-2 rounded-md" placeholder="enter product name" {...register("product_name", { required: true })}/>
            </div>
            <div className="p-2 flex gap-2 items-center">
                <label htmlFor="price">PRODUCT PRICE:</label>
                <input type="number" name="price" className="p-2 rounded-md" placeholder="enter product price" {...register("price", { required: true })}/>
            </div>
            <div className="p-2 flex gap-2 items-center">
                <label htmlFor="img">PRODUCT IMAGE:</label>
                <input type="file" name="img" className="p-2 rounded-md" {...register("product_image", { required: true })}/>
            </div>
            <div className="p-2 flex gap-2 items-center">
                <label htmlFor="desc">PRODUCT DESC:</label>
                <input type="text" name="desc" className="p-2 rounded-md" placeholder="enter product desc" {...register("product_desc", { required: true })}/>
            </div>
            <div className="p-2 flex gap-2 items-center">
                <label htmlFor="categ">PRODUCT CATEGORY:</label>
                <select name="categ" id="" className="p-3" {...register("product_category", { required: true })}>
                   {categories.map((category)=>(
                    <option key={category.$id} value={category.category_name}>
                        {category.category_text}
                    </option>
                   ))}
                </select>
            </div>
            <div className="p-4">
             <input type="submit" value="ADD" className="p-2 bg-orange-900 text-white rounded-lg"/>
            </div>
        </form>
    </div>
  )
}

export default AddProduct