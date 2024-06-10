import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../Components/Spinner.jsx';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Background from '../../assets/background-2.jpg';
import styled from 'styled-components';
import Backbutton from '../../Components/Backbutton.jsx';

const ShowPayments = () => {
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
                  {/* <Link to='/admindashboard/addpayments'>
                    <MdOutlineAddBox className='text-red-800 text-4xl' />
                  </Link> */}
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members
                    .filter((member) =>
                      member.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((member, index) => (
                      <tr key={member._id} className='h-8'>
                        <td>{index + 1}</td>
                        <td>{member.name}</td>
                        <td>{member.email}</td>
                        <td>{member._id}</td>
                        <td>
                          {member.payments && member.payments.length > 0 ? (
                            [...new Set(member.payments.map((payment) => payment.isActive ? 'Active' : 'Expired'))].map((status, index) => (
                              <StatusIndicator expired={status === 'Expired' ? true : undefined} key={index}>
                                {status}
                              </StatusIndicator>
                            ))
                          ) : (
                            'No Payments'
                          )}
                        </td>
                        <td>
                          <Link to={`/admindashboard/addpayments/${member._id}`}>Renew</Link>
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

export default ShowPayments;

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
    background-color: rgba(0, 0, 0, 0.05);
  }

  tbody tr:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;

  input {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    outline: none;
    font-size: 1rem;
    color: #333;
  }

  input::placeholder {
    color: #aaa;
  }
`;

const BackbuttonContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
`;

const StatusIndicator = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: bold;
  color: ${props => props.expired ? 'red' : 'green'};
`;
