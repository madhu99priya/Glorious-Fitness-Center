import React, { useState } from 'react';
import styled, {keyframes} from 'styled-components';
import NoticeForm from './NoticeForm';
import NoticeList from './NoticeList';
import Backbutton from '../Components/Backbutton.jsx'
import Background from '../assets/background-4.png'
import BreadcrumbNav from './BreadcrumbNav/BreadcrumbNav.jsx';

const AdminNotices = () => {
  const [selectedNotice, setSelectedNotice] = useState(null);

  const handleEditNotice = (notice) => {
    setSelectedNotice(notice);
  };

  const handleClearSelection = () => {
    setSelectedNotice(null);
  };

  return (
    <div className='bg-cover bg-center h-screen flex flex-col items-center justify-center' style={{ backgroundImage: `url(${Background})` }}>
    {/* <BackbuttonContainer>
        <Backbutton destination='/admindashboard'/>
      </BackbuttonContainer> */}
      < BreadcrumbNav />
      
    <AdminNoticesContainer>
      <NoticeFormContainer>
        <NoticeForm 
          selectedNotice={selectedNotice} 
          clearSelection={handleClearSelection} 
          fetchNotices={() => {}} 
        />
      </NoticeFormContainer>
      <NoticeListContainer>
        <NoticeList editNotice={handleEditNotice} />
      </NoticeListContainer>
    </AdminNoticesContainer>
    </div>
  );
};

export default AdminNotices;

const moveUpAndCenter = keyframes`
  0% {
    transform: translateY(100vh);
    opacity: 0;
  }
  50% {
    transform: translateY(-10%);
    opacity: 1;
  }
  50% {
    transform: translateY(0);
  }
`;

const AdminNoticesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  min-height: 90vh;
  margin-top : 3rem;
  animation: ${moveUpAndCenter} 1s ease-out;
`;

const BackbuttonContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;


const NoticeFormContainer = styled.div`
  flex: 1;
  margin-right: 2rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const NoticeListContainer = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
