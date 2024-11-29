import database from "../backend/DataBase"

function CategoryRow({index,name,categ,id,img_id}) {

  async function deleteCategories(id,img_id){
    const answer = window.confirm("are you sure ?")
    if(answer)
    {
      await database.deleteCategories(id);
      await database.deleteFile(img_id);
      alert("successfully deleted category")
      window.location.reload();
    }
  }

  return (
    <div className="w-full p-3 text-2xl rounded-md bg-white shadow-2xl flex justify-between">
    <h1>
      {`${index}. `}
      {name}
    </h1>
    <div>
      {categ}
    </div>
    <div className="flex gap-2">
      <button className="bg-lime-800 text-lg p-2 text-white rounded-lg">
        EDIT
      </button>
      <button className="bg-red-600 text-lg p-2 text-white rounded-lg" onClick={()=>{deleteCategories(id,img_id)}}>
        DEL
      </button>
    </div>
  </div>
  )
}

export default CategoryRow