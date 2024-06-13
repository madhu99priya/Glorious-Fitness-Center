// import React from 'react'
// import styled from 'styled-components'
// import Adminheader from '../../Components/Adminheader/Adminheader.jsx'
// import Adminsidebar from '../../Components/Adminsidebar/Adminsidebar.jsx'
// import '../../App.css'
// import Sidebar from './Sidebar.jsx'
// import DashboardNavbar from './DashboardNavbar.jsx'
// import Background from '../../assets/Admindashboard_image.png'


// const Dashboard = () => {
//   return (
//     // <div className="App">
//     //   <Adminheader />
//     //   <div className="main-content">
//     //     <Adminsidebar />
//     //   </div>
//     // </div>

//     < Div>
        
//         <img src={Background} alt="" className='hero-image' />
//         < Sidebar />
//         < DashboardNavbar />

  

//     </Div>
//   )
// }

// const Div = styled.div`
//   position: relative;

//   .hero-image{
//     position: absolute;
//     display : flex;
//     justify-content: center;
//     right: 18%;
//     margin-top: 1rem;
//     width: 50rem;
//   }

// `;


// export default Dashboard
import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar.jsx';
import { FaUsers, FaDollarSign, FaChartLine, FaEnvelope } from 'react-icons/fa';
import Background from '../../assets/Admindashboard_image.png';

const Dashboard = () => {
  return (
    <Div>
      <Sidebar />

      <MainContent>
        <Header>
          <h1>Admin Dashboard</h1>
          <h3>Welcome back, Admin!</h3>
        </Header>
        <DashboardStats>
          <Card>
            <FaDollarSign size={30} />
            <h2>Spent this month</h2>
            <p>$682.5</p>
          </Card>
          <Card>
            <FaChartLine size={30} />
            <h2>Earnings</h2>
            <p>$350.40</p>
          </Card>
          <Card>
            <FaUsers size={30} />
            <h2>New Registrations</h2>
            <p>321</p>
          </Card>
          <Card>
            <FaEnvelope size={30} />
            <h2>Messages</h2>
            <p>5</p>
          </Card>
        </DashboardStats>
        <GraphSection>
          <Graph>
            <h2>This Month Earnings</h2>
            {/* <img src={Background} alt="Graph" className="graph-image" /> */}
          </Graph>
        </GraphSection>
      </MainContent>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  position: relative;
  height: 100vh;
  background: #000;
`;

const MainContent = styled.div`
  margin-left: 18vw;
  padding: 2rem;
  width: 100%;
  background: url(${Background}) no-repeat center center fixed;
  background-size: contain;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #ff0000; 
  }
  h3 {
    font-size: 1.5rem;
    color: #ff6666; 
  }
`;

const DashboardStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: rgba(58, 58, 58, 0.7); /* Transparent dark background */
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  text-align: center;
  width: 22%;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
  }
  h2 {
    font-size: 1.2rem;
    margin: 1rem 0;
    color: #fff;
  }
  p {
    font-size: 1.5rem;
    color: #ffcc00;
  }
  svg {
    color: #ffcc00;
    margin-bottom: 1rem;
  }
`;

const GraphSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Graph = styled.div`
  background: rgba(42, 42, 42, 0.7); /* Transparent dark background */
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  text-align: center;
  width: 60%;
  height: 18rem;
  .graph-image {
    width: 100%;
    border-radius: 10px;
  }
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: white;
  }
`;
export default Dashboard;


