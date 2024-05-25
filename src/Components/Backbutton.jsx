import { Link } from 'react-router-dom'
import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";

const Backbutton = ( {destination = '/admindashboard/members'}) => {
  return (
    <div className='flex'>
       <Link to  = {destination} className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'>
            < IoMdArrowRoundBack  className='text-2xl'/>
       </Link>
      
    </div>
  )
}

export default Backbutton
