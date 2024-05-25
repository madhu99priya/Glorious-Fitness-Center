import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='Navbar'>
        <Link to='/'>Home</Link>
        <Link>Services & Payments</Link>
        <Link>Gallery</Link>
        <Link>About Us</Link>
        <Link to = '/admindashboard'>Admin</Link>
      
    </nav>
  )
}

export default Navbar
