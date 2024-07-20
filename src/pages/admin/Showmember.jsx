import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../Components/Spinner.jsx';
import Background from '../../assets/background-1.jpg';
import styled, { keyframes } from 'styled-components';
import BreadcrumbNav from '../../Components/BreadcrumbNav/BreadcrumbNav.jsx';

const Showmember = () => {
  const [member, setMember] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:9000/members/${id}`)
      .then((res) => {
        setMember(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <Container>
      <BreadcrumbNav />
      <Content>
        <Title>Member Details</Title>
        <Divider />
        {loading ? (
          <Spinner />
        ) : (
          <Card>
            <DetailItem label="Id" value={member._id} />
            <DetailItem label="Name" value={member.name} />
            <DetailItem label="Email" value={member.email} />
            <DetailItem label="Age" value={member.age} />
            <DetailItem label="Category" value={member.category} />
          </Card>
        )}
      </Content>
    </Container>
  );
};

const DetailItem = ({ label, value }) => (
  <Item>
    <Label>{label}:</Label>
    <Value>{value || 'N/A'}</Value>
  </Item>
);

export default Showmember;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  position: relative; /* Position context for child elements */
  background: url(${Background}) no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: bold;
  animation: ${fadeIn} 1s ease-out;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #ddd;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
  animation: ${fadeIn} 1.5s ease-out;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
`;

const Label = styled.span`
  font-size: 1.25rem;
  color: #555;
  font-weight: 500;
`;

const Value = styled.span`
  font-size: 1.25rem;
  color: #007BFF;
  font-weight: 700;
  text-align: right;
  max-width: 60%;
  word-break: break-word;
`;
