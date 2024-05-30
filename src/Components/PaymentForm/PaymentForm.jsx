// import React, { useState, useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe('pk_test_51PM9dJ2MpEBmq3acEmzbbN7VA8dBR88dvo6m5weguHB9cCWbqYLAdQj87Qxbibk304AuaBVb3pzjhksWObVhNCGy00kyACT6ft'); 

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [clientSecret, setClientSecret] = useState('');

//   useEffect(() => {
//     const createPaymentIntent = async () => {
//       const response = await fetch('http://localhost:9000/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount: 1000 }), // Amount in cents (e.g., 1000 cents = 10 LKR)
//       });

//       const data = await response.json();
//       setClientSecret(data.clientSecret);
//     };

//     createPaymentIntent();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: cardElement,
//         billing_details: {
//           name: 'Customer Name',
//         },
//       },
//     });

//     if (error) {
//       console.log('[error]', error);
//     } else {
//       console.log('[PaymentIntent]', paymentIntent);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe || !clientSecret}>
//         Pay
//       </button>
//     </form>
//   );
// };

// const PaymentForm = () => (
//   <Elements stripe={stripePromise}>
//     <CheckoutForm />
//   </Elements>
// );

// export default PaymentForm;


// PaymentForm.js
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentForm.css'; // Create this CSS file for custom styling

const stripePromise = loadStripe('pk_test_51PM9dJ2MpEBmq3acEmzbbN7VA8dBR88dvo6m5weguHB9cCWbqYLAdQj87Qxbibk304AuaBVb3pzjhksWObVhNCGy00kyACT6ft'); // Use your own publishable key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    const createPaymentIntent = async () => {
      const response = await fetch('http://localhost:9000/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000 }), // Amount in cents (e.g., 1000 cents = 10 LKR)
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
    };

    createPaymentIntent();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'Customer Name',
        },
      },
    });

    if (error) {
      console.log('[error]', error);
      setPaymentStatus('Payment failed. Please try again.');
    } else {
      console.log('[PaymentIntent]', paymentIntent);
      setPaymentStatus('Payment successful! Thank you for your payment.');
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <div className="payment-form-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <button type="submit" disabled={!stripe || !clientSecret} className="pay-button">
          Pay
        </button>
      </form>
      {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
    </div>
  );
};

const PaymentForm = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentForm;
