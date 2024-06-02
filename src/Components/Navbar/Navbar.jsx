// import React, { useState, useEffect } from 'react';
// import AdminLog from '../AdminLogging/AdminLog.jsx';
// import './Navbar.css';
// import { MdAdminPanelSettings } from "react-icons/md";
// import { Link as ScrollLink } from 'react-scroll';

// const Navbar = () => {
//   const [showAdminLog, setShowAdminLog] = useState(false);
//   const [activeSection, setActiveSection] = useState('home');
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [pastHome, setPastHome] = useState(false);

//   const toggleAdminLog = () => {
//     setShowAdminLog(!showAdminLog);
//   };

  
//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = document.querySelectorAll('section');
//       let currentSection = 'home';

//       sections.forEach(section => {
//         const sectionTop = section.offsetTop - 100; 
//         if (window.scrollY >= sectionTop) {
//           currentSection = section.getAttribute('id');
//         }
//       });

//       setActiveSection(currentSection);
//       setIsScrolled(window.scrollY > 0);

//       const homeSection = document.getElementById('home');
//       const homeSectionBottom = homeSection.offsetHeight;
//       setPastHome(window.scrollY > homeSectionBottom);
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <nav className={`${isScrolled ? 'scrolled' : ''} ${pastHome ? 'past-home' : ''}`}>
//       <ScrollLink
//         to='home'
//         smooth={true}
//         duration={500}
//         className={activeSection === 'home' ? 'active' : ''}
//       >
//         Home
//       </ScrollLink>
//       <ScrollLink
//         to='programs'
//         smooth={true}
//         duration={500}
//         className={activeSection === 'programs' ? 'active' : ''}
//       >
//         Services & Payments
//       </ScrollLink>
//       <ScrollLink
//         to='gallery'
//         smooth={true}
//         duration={500}
//         className={activeSection === 'gallery' ? 'active' : ''}
//       >
//         Gallery
//       </ScrollLink>
//       <ScrollLink
//         to='about'
//         smooth={true}
//         duration={500}
//         className={activeSection === 'about' ? 'active' : ''}
//       >
//         About Us
//       </ScrollLink>
//       <MdAdminPanelSettings 
//         onClick={toggleAdminLog} 
//         size={33} 
//         className='navbar-icon'
//       />
//       {showAdminLog && <AdminLog toggleAdminLog={toggleAdminLog} />}
      
//     </nav>
//   );
// };

// export default Navbar;

// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import AdminLog from '../AdminLogging/AdminLog.jsx';
import './Navbar.css';
import { MdAdminPanelSettings } from "react-icons/md";
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const [showAdminLog, setShowAdminLog] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [pastHome, setPastHome] = useState(false);

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
      setIsScrolled(window.scrollY > 0);

      const homeSection = document.getElementById('home');
      const homeSectionBottom = homeSection.offsetHeight;
      setPastHome(window.scrollY > homeSectionBottom);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`${isScrolled ? 'scrolled' : ''} ${pastHome ? 'past-home' : ''} ${!pastHome ? 'non-fixed' : 'fixed'}`}>
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





