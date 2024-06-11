import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Backbutton from '../Backbutton.jsx';

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
      const response = await axios.post('http://localhost:9000/payments', {
        memberId,
        plan,
        paymentMethodId: paymentMethod.id,
      });

      console.log(response.data);
      // Handle success or error accordingly

    } catch (error) {
      console.error(error);
      setError(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }

  };

  return (
    < >

    <div>
    <BackbuttonContainer>
        <Backbutton destination='/admindashboard/payments' />
    </BackbuttonContainer>
    </div>
    
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
        <SubmitButton type="submit" disabled={!stripe || loading}>
          {loading ? 'Processing...' : 'Pay'}
        </SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </FormContainer>
    </>
  );
};

const PaymentFormPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentFormPage;

const FormContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: black;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
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
  background-color: #28a745;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
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

