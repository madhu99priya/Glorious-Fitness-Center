import React, { useState } from 'react';
import './AdminNotices.css';

function Adminnotices() {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNotice.trim()) {
      setNotices([...notices, newNotice]);
      setNewNotice('');
    }
  };

  return (
    <div className="notices">
      <h2>Notices</h2>
      <form onSubmit={handleSubmit} className="notice-form">
        <textarea
          value={newNotice}
          onChange={(e) => setNewNotice(e.target.value)}
          placeholder="Write your notice here..."
        />
        <button type="submit">Post Notice</button>
      </form>
      <div className="notice-list">
        {notices.length > 0 ? (
          notices.map((notice, index) => (
            <div key={index} className="notice">
              {notice}
            </div>
          ))
        ) : (
          <p>No notices posted yet.</p>
        )}
      </div>
    </div>
  );
}

export default Adminnotices;