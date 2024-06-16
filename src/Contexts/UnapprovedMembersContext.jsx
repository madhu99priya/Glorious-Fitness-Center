import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UnapprovedMembersContext = createContext();

export const UnapprovedMembersProvider = ({ children }) => {
  const [newRegistrationsCount, setNewRegistrationsCount] = useState(0);

  useEffect(() => {
    const fetchUnapprovedMembers = async () => {
      try {
        const response = await axios.get('http://localhost:9000/unapproved/count');
        setNewRegistrationsCount(response.data.count);
      } catch (error) {
        console.error('Error fetching unapproved members count:', error);
      }
    };

    fetchUnapprovedMembers();
  }, []);

  return (
    <UnapprovedMembersContext.Provider value={newRegistrationsCount}>
      {children}
    </UnapprovedMembersContext.Provider>
  );
};

export default UnapprovedMembersContext;
