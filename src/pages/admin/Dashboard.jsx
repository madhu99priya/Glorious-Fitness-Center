import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import Sidebar from './Sidebar.jsx';
import { FaUsers, FaDollarSign, FaChartLine, FaEnvelope } from 'react-icons/fa';
import Background from '../../assets/Admindashboard_image.png';
import UnapprovedMembersContext from '../../Contexts/UnapprovedMembersContext.jsx';

const Dashboard = () => {
  const unapprovedMembersCount = useContext(UnapprovedMembersContext);

  return (
    <Div>
      <Sidebar />
      <MainContent>
        <Header>
          <h1><span className='stroke-text'>Admin </span> Dashboard</h1>
          <h3>Welcome back, Admin!</h3>
        </Header>
        <DashboardStats>
          <Card>
            <FaDollarSign size={30} />
            <h2>Spent this month</h2>
            <p>Rs.150,000</p>
          </Card>
          <Card>
            <FaChartLine size={30} />
            <h2>Earnings</h2>
            <p>Rs.35,000</p>
          </Card>
          <Card>
            <FaUsers size={30} />
            <h2>New Registrations</h2>
            <p>{unapprovedMembersCount}</p>
          </Card>
          <Card>
            <FaEnvelope size={30} />
            <h2>Messages</h2>
            <p>5</p>
          </Card>
        </DashboardStats>
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    margin-top: -0.5rem;
  }
`;

const DashboardStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Card = styled.div`
  background: rgba(58, 58, 58, 0.7);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  text-align: center;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  animation: ${bounceAnimation} 1.5s ease-in-out infinite;
  
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

export default Dashboard;
