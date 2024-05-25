import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [category, setCategory] = useState('');

  const handleRegister = () => {
    const data = { name, email, age, category };

    axios.post('http://localhost:9000/register', data)
      .then(response => {
        console.log(response.data);
        alert('Registration submitted for approval');
      })
      .catch(error => {
        console.log(error)
        alert('An error occurred. Check the console for details.');
      });
  };

  return (
    <div>
      <h1>Register for a Program</h1>
      <form>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="Strength Training">Strength Training</option>
          <option value="Cardio Training">Cardio Training</option>
          <option value="Fat Burning">Fat Burning</option>
          <option value="Health Fitness">Health Fitness</option>
        </select>
        <button type="button" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
