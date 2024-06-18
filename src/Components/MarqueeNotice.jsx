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

  return (
    <MarqueeContainer>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MarqueeContent>
          {notices.length > 0 ? (
            notices.map((notice) => (
              <Notice key={notice._id}>
                <strong>{notice.title}: </strong>
                <span>{notice.content}</span>
              </Notice>
            ))
          ) : (
            <p>No notices found</p>
          )}
        </MarqueeContent>
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
`;

const MarqueeContent = styled.div`
  display: inline-block;
  animation: marquee 15s linear infinite;

  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const Notice = styled.div`
  margin-right: 1rem;
  padding: 0.5rem;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 1rem;
`;
