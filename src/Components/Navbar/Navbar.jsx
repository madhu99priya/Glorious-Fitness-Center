import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import './Navbar.css'

const Navbar = () => {
  return (

    <nav className='Navbar'>
        <Link to='/'>Home</Link>
        <HashLink smooth to='/#Programs'>Services & Payments</HashLink>
        <Link>Gallery</Link>
        <Link>About Us</Link>
        <Link to = '/admindashboard'>Admin</Link>
    </nav>
  )
}

export default Navbar
