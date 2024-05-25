import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UnapprovedMembers = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/unapproved')
      .then(response => {
        setMembers(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleApprove = (id) => {
    axios.put(`http://localhost:9000/approve/${id}`)
      .then(response => {
        setMembers(members.filter(member => member._id !== id));
        alert('Member approved');
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred. Check the console for details.');
      });
  };

  return (
    <div>
      <h1>Unapproved Members</h1>
      <ul>
        {members.map(member => (
          <li key={member._id}>
            {member.name} - {member.email} - {member.age} - {member.category}
            <button onClick={() => handleApprove(member._id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnapprovedMembers;
