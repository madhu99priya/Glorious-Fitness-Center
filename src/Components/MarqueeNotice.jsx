import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const MarqueeNotice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:9000/notices');
      setNotices(response.data);
    } catch (error) {
      setError('Error fetching notices');
      console.error(error);
    }
    setLoading(false);
  };

  const concatenatedNotices = notices.map(notice => `<strong>${notice.title}:</strong> ${notice.content}`).join(' | ');

  return (
    <MarqueeContainer>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MarqueeContent dangerouslySetInnerHTML={{ __html: notices.length > 0 ? concatenatedNotices : 'No notices found' }} />
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </MarqueeContainer>
  );
};

export default MarqueeNotice;

const MarqueeContainer = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  background-color: rgba(255, 255,255, 0.5); 
  padding: 10px; 
  margin-top : 35px;
  marging-bottom : 0; 
`;

const MarqueeContent = styled.div`
  display: inline-block;
  animation: marquee 15s linear infinite;
  color: black;

  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 1rem;
`;
