import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import AdminLog from '../AdminLogging/AdminLog.jsx';
import './Navbar.css';
import { MdAdminPanelSettings } from "react-icons/md";

const Navbar = () => {
  // const location = useLocation();
  const [showAdminLog, setShowAdminLog] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  const toggleAdminLog = () => {
    setShowAdminLog(!showAdminLog); 
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <nav >
        <Link
          to='/'
          className={activeLink === '/' ? 'active' : ''}
          onClick={() => handleLinkClick('/')}
        >
          Home
        </Link>
        <HashLink
          smooth
          to='/#Programs'
          className={activeLink === '/#Programs' ? 'active' : ''}
          onClick={() => handleLinkClick('/#Programs')}
        >
          Services & Payments
        </HashLink>
        <Link
          to='/gallery'
          className={activeLink === '/gallery' ? 'active' : ''}
          onClick={() => handleLinkClick('/gallery')}
        >
          Gallery
        </Link>
        <Link
          to='/about'
          className={activeLink === '/about' ? 'active' : ''}
          onClick={() => handleLinkClick('/about')}
        >
          About Us
        </Link>
        <MdAdminPanelSettings
          onClick={toggleAdminLog}
          size={33}
          className='navbar-icon' 
        />
        {showAdminLog && <AdminLog toggleAdminLog={toggleAdminLog} />}
    </nav>
  );
};

export default Navbar;
