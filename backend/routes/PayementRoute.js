// import express from 'express'
// import Stripe from 'stripe'

// const router = express.Router();



// const stripe = Stripe('sk_test_51PM9dJ2MpEBmq3acidYub1EivmYfEk34Ai9GEd1IAevgKuAZODNxfCFDty8tXquttvMTW4W1IchYoXs2A22mWWCg00tfwUDeZO'); 

// router.post('/', async (req, res) => {
//   const { amount, email, token } = req.body;

//   try {
//     const customer = await stripe.customers.create({
//       email: email,
//       source: token.id,
//       name: token.card.name,
//     });

//     const charge = await stripe.charges.create({
//       amount: parseFloat(amount) * 100,
//       description: `Payment for USD ${amount}`,
//       currency: "USD",
//       customer: customer.id,
//     });

//     res.status(200).send(charge);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ error: "Payment failed" });
//   }
// });


// export default router;

import express from 'express';
import Stripe from 'stripe';
import { Payment } from '../models/paymentmodel.js';
import { Member } from '../models/membermodel.js';

const router = express.Router();
const stripe = new Stripe('sk_test_51PM9dJ2MpEBmq3acidYub1EivmYfEk34Ai9GEd1IAevgKuAZODNxfCFDty8tXquttvMTW4W1IchYoXs2A22mWWCg00tfwUDeZO');


router.post('/', async (req, res) => {
  const { memberId, plan, paymentMethodId } = req.body;
  let amount;

  // Validate plan and set amount
  switch (plan) {
    case '1 month':
      amount = 2500;
      break;
    case '6 months':
      amount = 14000;
      break;
    case '1 year':
      amount = 29000;
      break;
    default:
      return res.status(400).send('Invalid plan selected');
  }

  try {
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).send('Member not found');
    }

    // Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // amount in cents
      currency: 'inr',
      payment_method: paymentMethodId,
      confirm: true,
      description: `Payment for ${plan} plan`,
      return_url: 'http://localhost:5173/payment-confirmation'
    });

    // Handle successful payment
    const payment = new Payment({
      memberId,
      amount,
      paymentMethod: 'Stripe',
      plan,
    });

    await payment.save();

    // Link payment to member
    member.payments.push(payment._id);
    await member.save();

    res.status(201).send(payment);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;

