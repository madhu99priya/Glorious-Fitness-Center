import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner.jsx'
import styled, {keyframes} from 'styled-components';
import Backbutton from '../Backbutton.jsx';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Background from '../../assets/background-1.jpg'

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [category, setCategory] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar()

  const handleRegister = () => {
    const data = { name, email, age, category };
    setLoading(true);


    axios.post('http://localhost:9000/register', data)
      .then(response => {
        setLoading(false);
        console.log(response.data);
        enqueueSnackbar('Registration submitted for approval', {variant : 'success', autoHideDuration: 1000})
        navigate('/');
        //alert('Registration submitted for approval');
        
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
        //alert('An error occurred. Check the console for details.');
        enqueueSnackbar('An error occurred. Check the console for details.', {variant : 'error', autoHideDuration: 1000})
      });
  };

  return (

    <div className='bg-cover bg-center h-screen flex flex-col items-center justify-center' style={{ backgroundImage: `url(${Background})` }}>
      <BackbuttonContainer>
        <Backbutton destination = {'/'}/>
      </BackbuttonContainer>
      <Section>
        <div className='form-container'>
          <h1>Register for a Program</h1>
          <hr />
          {loading && <Spinner />}

          <form>
            <div className='form-group'>
              <label>Name</label>
              <input
                type='text'
                value={name}
                placeholder="Enter the Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className='form-group'>
              <label>Email</label>
              <input
                type='email'
                value={email}
                placeholder="Enter the email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='form-group'>
              <label>Age</label>
              <input
                type='number'
                value={age}
                placeholder="Enter the age"
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div className='form-group'>
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="Select the requird Category">Select Category(N/A)</option>
                <option value="Strength Training">Strength Training</option>
                <option value="Cardio Training">Cardio Training</option>
                <option value="Fat Burning">Fat Burning</option>
                <option value="Health Fitness">Health Fitness</option>
              </select>
            </div>
            

            <button type='button' onClick={handleRegister}>
              Register
            </button>
          </form>
        </div>
      </Section>
    </div>

  );
};

export default RegistrationForm;


const BackbuttonContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

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

const Section = styled.section`
  color: black;

  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40vw;
    max-height: 85vh;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    overflow: hidden;
    margin: 5.3rem auto;
    padding: 2rem;
    animation: ${moveUpAndCenter} 1s ease-out;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem; 
    width: 100%;
    text-align: center;
  }

  hr {
    width: 100%;
    border: none;
    border-top: 1px solid white;
    margin-bottom: 1rem; 
  }

  form {
    width: 100%;
  }

  .form-group {
    margin-bottom: 1rem;
    width: 100%;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input,select {
    width: calc(100%);
    padding: 0.5rem;
    border: 1px solid white; 
    border-radius: 0.25rem;
    background: rgba(255, 255, 255, 0.7);
  }

  button {
    display: block;
    width: calc(100% );
    padding: 0.75rem;
    margin-top: 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }
`;