import React from 'react';
import './AdminReviews.css';

const reviews = [
  { id: 1, client: 'John Doe', review: 'Great gym with excellent equipment!' },
  { id: 2, client: 'Jane Smith', review: 'Friendly staff and clean facilities.' },
  { id: 3, client: 'Sam Brown', review: 'Love the classes and trainers.' },
];

function AdminReviews() {
  return (
    <div className="review-list">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review">
            <h3>{review.client}</h3>
            <p>{review.review}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}

export default AdminReviews;
