import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentForm.css';
import $ from 'jquery'; 
import Logo from '../../assets/logo.png'

const stripePromise = loadStripe('pk_test_51PM9dJ2MpEBmq3acEmzbbN7VA8dBR88dvo6m5weguHB9cCWbqYLAdQj87Qxbibk304AuaBVb3pzjhksWObVhNCGy00kyACT6ft');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('http://localhost:9000/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: 1000 }),
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    };

    createPaymentIntent();

    // Applying the mask plugin in jquery
    $(document).ready(function(){
      $('[data-mask="0000 0000 0000 0000"]').mask('0000 0000 0000 0000');
      $('[data-mask="00 / 00"]').mask('00 / 00');
      $('[data-mask="000"]').mask('000');
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumber = document.querySelector('[data-mask="0000 0000 0000 0000"]').value;
    const expiryDate = document.querySelector('[data-mask="00 / 00"]').value.split('/');
    const cvv = document.querySelector('[data-mask="000"]').value;
    const cardHolder = document.querySelector('[placeholder="Coding Market"]').value;

    const card = {
      number: cardNumber.replace(/\s+/g, ''),
      exp_month: parseInt(expiryDate[0]),
      exp_year: parseInt(expiryDate[1]),
      cvc: cvv,
    };

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: cardHolder,
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
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('Payment failed. Please try again.');
    }
  };

  return (
    <div className="wrapper">
      <div className="payment">
        <div >
          <img src={Logo} alt="" className="payment-logo"/>
        </div>
        <h2>Payment Gateway</h2>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="card space icon-relative">
              <label className="label">Card holder:</label>
              <input type="text" className="input" placeholder="Card holder's Name" />
              <i className="fas fa-user"></i>
            </div>
            <div className="card space icon-relative">
              <label className="label">Card number:</label>
              <input type="text" className="input" data-mask="0000 0000 0000 0000" placeholder="Card Number" />
              <i className="far fa-credit-card"></i>
            </div>
            <div className="card-grp space">
              <div className="card-item icon-relative">
                <label className="label">Expiry date:</label>
                <input type="text" name="expiry-data" className="input" data-mask="00 / 00" placeholder="00 / 00" />
                <i className="far fa-calendar-alt"></i>
              </div>
              <div className="card-item icon-relative">
                <label className="label">CVC:</label>
                <input type="text" className="input" data-mask="000" placeholder="000" />
                <i className="fas fa-lock"></i>
              </div>
            </div>
            <div className="btn">
              <button type="submit" disabled={!stripe || !clientSecret}>Pay</button>
            </div>
          </form>
        </div>
      </div>
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
