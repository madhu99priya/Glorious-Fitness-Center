import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../Components/Spinner.jsx';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Background from '../../assets/background-2.jpg';
import styled from 'styled-components';
import Backbutton from '../../Components/Backbutton.jsx';

const Showpayments = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    axios
      .get('http://localhost:9000/members')
      .then((res) => {
        setMembers(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='bg-cover bg-center h-screen' style={{ backgroundImage: `url(${Background})` }}>
      <BackbuttonContainer>
        <Backbutton destination='/admindashboard' />
      </BackbuttonContainer>
      <div className='flex justify-between items-center p-4'>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <Section>
          <div className="table-container">
            <section className="table_header">
              <div className='flex justify-between items-center p-0'>
                <h1>Members List</h1>
                <div className="flex items-center gap-2">
                  <SearchBar>
                    <input 
                      type="text" 
                      placeholder="Search members..." 
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </SearchBar>
                  <Link to='/admindashboard/addpayments'>
                    <MdOutlineAddBox className='text-red-800 text-4xl' />
                  </Link>
                </div>
              </div>
            </section>
            <section className="table_body">
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Id</th>
                    <th>Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, index) => (
                    <tr key={member._id} className='h-8'>
                      <td>{index + 1}</td>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td>{member._id}</td>
                      <td>
                        {member.payments && member.payments.length > 0 ? (
                          member.payments.map(payment => (
                            <StatusIndicator expired={!payment.isActive} key={payment._id}>
                              {payment.isActive ? 'Active' : 'Expired'}
                            </StatusIndicator>
                          ))
                        ) : (
                          'No Payments'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </Section>
      )}
    </div>
  );
}

export default Showpayments;

const Section = styled.section`
  color: black;

  .table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60vw;
    max-height: 85vh;
    background-color: rgba(255, 255, 255, 0.5); /* More transparent */
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    overflow: hidden;
    margin: 4rem auto;
    padding: 1rem;
  }

  .table_header {
    width: 100%;
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .table_header h1 {
    font-size: 1.6rem;
    font-weight: bold;
    margin: 0;
  }

  .table_body {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .table_body table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  table, th, td {
    padding: 1rem;
  }

  thead th {
    position: sticky;
    top: 0;
    background-color: #f8f9fa;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  tbody tr:nth-child(even) {
    background-color: rgba(250, 250, 250, 0.5);
  }

  tbody tr:hover {
    background-color: #e9ecef;
  }

  tbody td {
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }

  .table_body::-webkit-scrollbar-thumb {
    border-radius: 0.5rem;
    background-color: #0004;
  }
`;

const BackbuttonContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

const SearchBar = styled.div`
  input {
    padding: 0.4rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    outline: none;
    width: 200px;
    font-size: 1rem;
    background-color: rgba(255, 255, 255, 0.6); /* Transparent background */
    margin-left: 1rem;
  }

  input::placeholder {
    color: gray;
  }
`;

const StatusIndicator = styled.div`
  padding: 0.5rem;
  border-radius: 5px;
  background-color: ${(props) => (props.expired ? '#e74c3c' : '#2ecc71')};
  color: white;
  text-align: center;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
