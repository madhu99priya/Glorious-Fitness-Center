import React, { useState, useEffect } from 'react';
import AdminLog from '../AdminLogging/AdminLog.jsx';
import './Navbar.css';
import { MdAdminPanelSettings } from "react-icons/md";
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const [showAdminLog, setShowAdminLog] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleAdminLog = () => {
    setShowAdminLog(!showAdminLog);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = 'home';

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; 
        if (window.scrollY >= sectionTop) {
          currentSection = section.getAttribute('id');
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className='navbar'>
      <ScrollLink
        to='home'
        smooth={true}
        duration={500}
        className={activeSection === 'home' ? 'active' : ''}
      >
        Home
      </ScrollLink>
      <ScrollLink
        to='programs'
        smooth={true}
        duration={500}
        className={activeSection === 'programs' ? 'active' : ''}
      >
        Services & Payments
      </ScrollLink>
      <ScrollLink
        to='gallery'
        smooth={true}
        duration={500}
        className={activeSection === 'gallery' ? 'active' : ''}
      >
        Gallery
      </ScrollLink>
      <ScrollLink
        to='about'
        smooth={true}
        duration={500}
        className={activeSection === 'about' ? 'active' : ''}
      >
        About Us
      </ScrollLink>
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

