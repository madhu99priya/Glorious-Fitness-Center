import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../Components/Spinner.jsx';
import Backbutton from '../../Components/Backbutton.jsx';
import Background from '../../assets/background-1.jpg';
import styled from 'styled-components';

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
      <BackbuttonContainer>
        <Backbutton />
      </BackbuttonContainer>
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
            <DetailItem label="Joined Date" value={new Date(member.createdAt).toLocaleString()} />
            <DetailItem label="Last Update Time" value={new Date(member.updatedAt).toLocaleString()} />
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

const Container = styled.div`
  background: url(${Background}) no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackbuttonContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

const Content = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  padding: 1.2rem;
  width: 90%;
  max-width: 600px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: bold;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #ddd;
  margin-bottom: 1rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
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
  color: #007BFF;  /* Add a primary color for the values */
  font-weight: 700;
  text-align: right;
  max-width: 60%;
  word-break: break-word;
`;

