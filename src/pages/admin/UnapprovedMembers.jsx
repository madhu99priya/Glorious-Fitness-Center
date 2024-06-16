import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Backbutton from '../../Components/Backbutton.jsx';
import Background from '../../assets/background-2.jpg'
import Spinner from '../../Components/Spinner.jsx';
import DeleteMemberPopup from '../../Components/DeleteMemberPopup.jsx';
import { FcDisapprove } from "react-icons/fc";
import { FcApprove } from "react-icons/fc";
import styled from 'styled-components';
import { useSnackbar } from 'notistack';

const UnapprovedMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {

    setLoading(true);

    axios.get('http://localhost:9000/unapproved')
      .then(response => {
        setMembers(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleApprove = (id) => {
    axios.put(`http://localhost:9000/approve/${id}`)
      .then(() => {
        setMembers(members.filter(member => member._id !== id));
        //alert('Member approved');
        enqueueSnackbar('Member approved', {variant: 'success', autoHideDuration : 1000})
      })
      .catch(error => {
        console.error(error);
        //alert('An error occurred. Check the console for details.');
        enqueueSnackbar('An error occurred. Check the console for details.', {variant : 'error', autoHideDuration: 1000})
      });
  };

  const handleDeleteClick = (member) => {
    setSelectedMember(member);
    setShowPopup(true);
  };

  const handleConfirmDelete = () => {
    if (selectedMember) {
      axios
        .delete(`http://localhost:9000/unapprove/${selectedMember._id}`)
        .then(() => {
          setMembers(members.filter(member => member._id !== selectedMember._id));
          setShowPopup(false);
        })
        .catch((err) => {
          alert('An error occurred. Please check the console');
          console.log(err);
          setShowPopup(false);
        });
    }
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
    setSelectedMember(null);
  };

  return (
    <div className='bg-cover bg-center h-screen' style={{ backgroundImage: `url(${Background})` }}>
      <BackbuttonContainer>
        <Backbutton destination='/admindashboard' />
      </BackbuttonContainer>
      <div className='flex justify-between items-center p-4'>
        {/* <Link to='/admindashboard/members/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link> */}
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <Section>
          <div className="table-container">
            <section className="table_header">
              <div className='flex justify-between items-center p-0'>
                <h1>Unapproved Members</h1>
              </div>
            </section>
            <section className="table_body">
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Category</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, index) => (
                    <tr key={member._id} className='h-8'>
                      <td>{index + 1}</td>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td>{member.age}</td>
                      <td>{member.category}</td>
                      <td>
                        <div className='flex justify-start gap-x-4'>
                   
                          <button onClick={() => handleApprove(member._id)} className='text-red-600'>
                            <FcApprove className='text-2xl' />
                          </button>

                          <button onClick={() => handleDeleteClick(member)} className='text-red-600'>
                            <FcDisapprove className='text-2xl' />
                          </button>


                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </Section>
      )}

      {showPopup && (
        <DeleteMemberPopup 
          onConfirm={handleConfirmDelete} 
          onCancel={handleCancelDelete} 
        />
      )}
    </div>
  );
};

export default UnapprovedMembers;


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
    margin:4rem auto;
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