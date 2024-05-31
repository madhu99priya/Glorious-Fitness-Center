import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import AdminLog from '../AdminLogging/AdminLog.jsx'
import './Navbar.css'
import { MdAdminPanelSettings } from "react-icons/md";

const Navbar = () => {

  const [showAdminLog, setShowAdminLog] = useState(false);
  const toggleAdminLog = () => {
    setShowAdminLog(!showAdminLog); 
  };

  return (

    <nav className='Navbar'>
        <Link to='/'>Home</Link>
        <HashLink smooth to='/#Programs'>Services & Payments</HashLink>
        <Link>Gallery</Link>
        <Link>About Us</Link>
        <MdAdminPanelSettings onClick={toggleAdminLog} size={33} style={{ cursor: 'pointer' }} />
        {showAdminLog && <AdminLog toggleAdminLog={toggleAdminLog} />}
    </nav>
  )
}

export default Navbar
