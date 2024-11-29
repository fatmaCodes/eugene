import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import database from "../backend/DataBase"
import conf from "../conf/conf";
import { useForm } from "react-hook-form";

function AddCategoryForm() {

    const userData = useSelector((state) => state.authReducer.userData);

    const navigate = useNavigate();

    const {handleSubmit,register,reset} = useForm()

    useEffect(() => {
      if (userData.$id != conf.adminId) {
        alert("you are not admin")
        navigate("/")
      }
    }, [userData])

    async function handleAddCategory(data){
        
        const img = await database.uploadFile(data.category_image[0]);

        if(img)
        {
            const imgId = img.$id
            const newCategory = await database.addCategory({...data,category_image:imgId})
            if (newCategory) {
                reset(data)
                alert("category added succesfully!");
                navigate("/admin/addcategories")
            }else{
                alert("failed to add try again!");
            }
        }
        else
        {
            alert("file upload error try again!");
        }

    }

  return (
    <div className="flex-grow">
        <h1 className="p-4 text-xl ">
            Add Categories
        </h1>
        <form onSubmit={handleSubmit(handleAddCategory)}>
            <div className="p-2 flex gap-2 it items-center">
                <label htmlFor="name">CATEGORY NAME:</label>
                <input type="text"  name="name" className="p-2 rounded-md" placeholder="enter category namer" {...register("category_name", { required: true })}/>
            </div>
           
            <div className="p-2 flex gap-2 items-center">
                <label htmlFor="img">CATEGORY IMAGE:</label>
                <input type="file" name="img" className="p-2 rounded-md" {...register("category_image", { required: true })}/>
            </div>

            <div className="p-2 flex gap-2 it items-center">
                <label htmlFor="name">CATEGORY TEXT:</label>
                <input type="text"  name="name" className="p-2 rounded-md" placeholder="enter category text" {...register("category_text", { required: true })}/>
            </div>
          
           
            <div className="p-4">
             <input type="submit" value="ADD" className="p-2 bg-orange-900 text-white rounded-lg"/>
            </div>
        </form>
    </div>
  )
}

export default AddCategoryForm