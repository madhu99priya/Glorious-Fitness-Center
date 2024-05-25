import React from 'react'
import './Header.css'
import logo from '../../assets/logo.png'
import Navbar from '../Navbar/Navbar.jsx'


function Header() {
  return (
    <div className="header">
        <img src= {logo} className='logo'/>
         <Navbar />
    </div>
  )
}

export default Header
