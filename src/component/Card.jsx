import React from 'react'
import { useNavigate } from 'react-router-dom'

function Card({img,text,categ}) {

  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate(`/categories/${categ}`)
  }
  
  


  return (
    <button 
    onClick={handleClick}
    className='h-[13rem] w-[16rem] rounded-xl p-1 bg-slate-50'>
        <img src={img} alt="" className='rounded-xl w-full max-h-[85%]'/>
        <p className='w-full font-[eduBold] my-2 text-center'>{text}</p>
    </button>
  )
}

export default Card