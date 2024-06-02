import React from 'react'
import styled from 'styled-components'
import Adminheader from '../../Components/Adminheader/Adminheader.jsx'
import Adminsidebar from '../../Components/Adminsidebar/Adminsidebar.jsx'
import '../../App.css'
import Sidebar from './Sidebar.jsx'
import DashboardNavbar from './DashboardNavbar.jsx'
import Background from '../../assets/Admindashboard_image.png'


const Dashboard = () => {
  return (
    // <div className="App">
    //   <Adminheader />
    //   <div className="main-content">
    //     <Adminsidebar />
    //   </div>
    // </div>

    < Div>
        
        <img src={Background} alt="" className='hero-image' />
        < Sidebar />
        < DashboardNavbar />

  

    </Div>
  )
}

const Div = styled.div`
  position: relative;

  .hero-image{
    position: absolute;
    display : flex;
    justify-content: center;
    right: 18%;
    margin-top: 1rem;
    width: 50rem;
  }

`;


export default Dashboard
