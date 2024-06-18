import React, { useState } from 'react';
import styled from 'styled-components';
import NoticeForm from './NoticeForm';
import NoticeList from './NoticeList';

const AdminNotices = () => {
  const [selectedNotice, setSelectedNotice] = useState(null);

  const handleEditNotice = (notice) => {
    setSelectedNotice(notice);
  };

  const handleClearSelection = () => {
    setSelectedNotice(null);
  };

  return (
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
  );
};

export default AdminNotices;

const AdminNoticesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  background-color: black;
  min-height: 100vh;
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
