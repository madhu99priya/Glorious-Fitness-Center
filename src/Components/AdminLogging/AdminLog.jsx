
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSnackbar } from 'notistack';


const AdminLog = ({ toggleAdminLog }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar()
  const [admin, setAdmin] = useState({
    userName: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAdmin(prevUsers => ({
      ...prevUsers,
      [name]: value
    }));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (admin.userName === 'admin' && admin.password === 'admin') {
      toggleAdminLog();
      enqueueSnackbar('Successfully logged in as admin', {variant : 'success'})
      navigate('/admindashboard');
    } else {
      enqueueSnackbar('Incorrect user name or password', {variant: 'error'})
    }
  };

  return (
    <AdminLogContainer>
      <Overlay />
      <FormContainer onSubmit={handleLoginSubmit}>
        <CloseButton onClick={toggleAdminLog}>&times;</CloseButton>
        <Title>Admin Log In</Title>
        <hr />
        <Label htmlFor="userName">User Name</Label>
        <Input
          id="userName"
          onChange={handleChange}
          value={admin.userName}
          name="userName"
          placeholder="Enter the Name"
          type="text"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          onChange={handleChange}
          value={admin.password}
          name="password"
          placeholder="Enter the Password"
          type="password"
        />
        <SubmitButton type="submit">Log In as Admin</SubmitButton>
      </FormContainer>
    </AdminLogContainer>
  );
};

export default AdminLog;

const AdminLogContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const FormContainer = styled.form`
  background: #7a7a7a;  
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 400px; 
  
  hr {
    width: 100%;
    border: none;
    border-top: 1px solid white;
    margin-bottom: 1rem; 
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.2rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.7rem;
  cursor: pointer;
  color : black;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: black;

`;

const Label = styled.label`
  font-size: 1rem;
  color: black;
  margin-bottom: 0.5rem;
  display: block;
  font-weight: bold;

`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #d1d1d1;  
  color: #555;  
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #0056b3;
  }
`;