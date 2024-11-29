import all from "../assets/all.png"
import port from "../assets/port.png"
import stream from "../assets/stream.png"
import articles from "../assets/articles.png"
import help from "../assets/help.png"
import gift from "../assets/gift.png"
import { useEffect } from "react"
import changeLink from "../component/Navbar/changeLink"
import { useState } from "react"
import Card from "../component/Card"
import database from "../backend/DataBase"
import { Query } from "appwrite"

function CategoryPage() {
  

  const [categories,setCategory] = useState([])

  
  async function loadCategories() {
    const _category = await database.getCategories([Query.limit(5000)]);

    setCategory(_category.documents)
  }
  
  useEffect(()=>{
    changeLink("#category");
    loadCategories();
  },[])
  
  
  return (
    <>
      <div className=" bg-[#2E151B] h-full w-full flex flex-col items-center gap-5 p-5">
        <h1 className="text-slate-100 ">
          <b> COLOR FAMILY </b>
        </h1>
        <div className="w-full flex justify-center items-center">

        <div className='w-[70%] p-4 flex flex-wrap gap-5'>
          
          {(categories.map((category) => {
            const img = database.getFilePreview(category.category_image)
            return <Card key={category.$id}  categ={category.category_name} text={category.category_text} img={img}/>
          }))}
           <Card img={all} categ="all"/>
        </div>
        </div>
     
        <div className="border-t-2 border-l-sky-100 p-3">
            <h1 className="w-full text-center text-slate-100 ">
              MORE
            </h1>
          <div className="w-full p-2 h-[25%] flex gap-16  items-center justify-center">
            <div className="w-full p-2 h-[25%] flex gap-16 justify-center">
              <Card img={port} />
              <Card img={stream} />
              <Card img={articles} />
            </div>
          </div>
          <div className="w-full p-2 h-[25%] flex gap-16 justify-center">
            <Card img={help} />
            <Card img={gift} />

          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryPage  