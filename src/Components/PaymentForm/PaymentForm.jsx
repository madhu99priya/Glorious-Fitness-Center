import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import Backbutton from '../Backbutton.jsx';
import Background from '../../assets/background-3.jpg';
import BreadcrumbNav from '../BreadcrumbNav/BreadcrumbNav.jsx';

const stripePromise = loadStripe('pk_test_51PM9dJ2MpEBmq3acEmzbbN7VA8dBR88dvo6m5weguHB9cCWbqYLAdQj87Qxbibk304AuaBVb3pzjhksWObVhNCGy00kyACT6ft');

const plans = {
  '1 month': 2500,
  '6 months': 14000,
  '1 year': 29000
};

const PaymentForm = () => {
  const { memberId: paramMemberId } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const [memberId, setMemberId] = useState(paramMemberId || '');
  const [plan, setPlan] = useState('1 month');
  const [amount, setAmount] = useState(plans['1 month']);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setAmount(plans[plan]);
  }, [plan]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    setLoading(true);

    try {
      // Create a PaymentMethod with card details
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      // Send paymentMethodId to the backend
      const response = await axios.post('http://backend:9000/payments', {
        memberId,
        plan,
        paymentMethodId: paymentMethod.id,
      });

      console.log(response.data);
      setSuccess(true); // Set success state to true on successful payment
    } catch (error) {
      console.error(error);
      setError(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-cover bg-center h-screen flex flex-col items-center justify-center' style={{ backgroundImage: `url(${Background})` }}>
      {/* <BackbuttonContainer>
        <Backbutton destination='/admindashboard/payments' />
      </BackbuttonContainer> */}
      < BreadcrumbNav />
      <FormContainer>
        <FormTitle>Member Payment Form</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="memberId">Member ID</Label>
            <Input
              type="text"
              id="memberId"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <Label htmlFor="plan">Plan</Label>
            <Select
              id="plan"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
            >
              <option value="1 month">1 month - Rs. 2500</option>
              <option value="6 months">6 months - Rs. 14000</option>
              <option value="1 year">1 year - Rs. 29000</option>
            </Select>
          </FormField>
          <FormField>
            <Label>Amount</Label>
            <AmountDisplay>Rs. {amount}</AmountDisplay>
          </FormField>
          <FormField>
            <Label>Card Details</Label>
            <CardElementContainer>
              <CardElement options={cardStyle} />
            </CardElementContainer>
          </FormField>
          <SubmitButton type="submit" disabled={!stripe || loading || success}>
            {loading ? 'Processing...' : success ? <CheckmarkIcon /> : 'Pay'}
          </SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
      </FormContainer>
    </div>
  );
};

const PaymentFormPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentFormPage;

const checkmarkAnimation = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const CheckmarkIcon = styled(FaCheckCircle)`
  animation: ${checkmarkAnimation} 0.5s ease-in-out;
  color: white;
  font-size: 2rem; // Increased size for better visual impact
`;

const FormContainer = styled.div`
  width: 30vw;
  margin: 4rem auto;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: black;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
  font-weight: bold;
  font-size: 1.5rem;
`;

const FormField = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 1rem;
`;

const AmountDisplay = styled.div`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 1rem;
  background-color: #e9ecef;
`;

const CardElementContainer = styled.div`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 1rem;
`;

const BackbuttonContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
`;

const cardStyle = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

