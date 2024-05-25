// for the purpose of showing the users to loading state
import React from 'react'


const Spinner = () => {
  return (
    // <div className='animate-ping w-16 h-16 m-8 rounded-full bg-sky-600'>
      
    // </div>
    <div className="flex items-center justify-center h-screen">
    <div className="relative">
      <div className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-red-300 opacity-75"></div>
      <div className="relative inline-flex h-16 w-16 rounded-full bg-red-300"></div>
    </div>
  </div>
  )
}

export default Spinner
