import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, {keyframes} from 'styled-components';

const NoticeList = ({ editNotice }) => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://backend:9000/notices'); // initially we tested with localhost:9000/ finally we want to test with backend:9000/ where backend is the name given for the backend
      setNotices(response.data);
    } catch (error) {
      setError('Error fetching notices');
      console.error(error);
    }
    setLoading(false);
  };

  const handleEdit = (notice) => {
    editNotice(notice);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`http://backend:9000/notices/${id}`);
      fetchNotices();
    } catch (error) {
      setError('Error deleting notice');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <NoticeListContainer>
      <Title>Notices</Title>
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        <NoticeListWrapper>
          {notices.map((notice) => (
            <NoticeItem key={notice._id}>
              <NoticeTitle>{notice.title}</NoticeTitle>
              <NoticeContent>{notice.content}</NoticeContent>
              <ButtonContainer>
                <EditButton onClick={() => handleEdit(notice)}>Edit</EditButton>
                <DeleteButton onClick={() => handleDelete(notice._id)}>Delete</DeleteButton>
              </ButtonContainer>
            </NoticeItem>
          ))}
        </NoticeListWrapper>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </NoticeListContainer>
  );
};

export default NoticeList;

const moveUpAndCenter = keyframes`
  0% {
    transform: translateY(100vh);
    opacity: 0;
  }
  50% {
    transform: translateY(-10%);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
  }
`;

const NoticeListContainer = styled.div`
  background-color: #e0ffff;
  padding: 2rem;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  margin-top: 2rem;
  color: black;
  animation: ${moveUpAndCenter} 1s ease-out;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
  font-size: 1.75rem;
  font-weight : bold;
`;

const NoticeListWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const NoticeItem = styled.li`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NoticeTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: #007bff;
`;

const NoticeContent = styled.p`
  margin-bottom: 1rem;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EditButton = styled.button`
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 1rem;
  text-align: center;
  font-size: 1rem;
`;
