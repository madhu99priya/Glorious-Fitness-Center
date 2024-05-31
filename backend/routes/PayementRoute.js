import express from 'express'
import Stripe from 'stripe'

const router = express.Router();



const stripe = Stripe('sk_test_51PM9dJ2MpEBmq3acidYub1EivmYfEk34Ai9GEd1IAevgKuAZODNxfCFDty8tXquttvMTW4W1IchYoXs2A22mWWCg00tfwUDeZO'); 

router.post('/', async (req, res) => {
  const { amount, email, token } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: email,
      source: token.id,
      name: token.card.name,
    });

    const charge = await stripe.charges.create({
      amount: parseFloat(amount) * 100,
      description: `Payment for USD ${amount}`,
      currency: "USD",
      customer: customer.id,
    });

    res.status(200).send(charge);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Payment failed" });
  }
});


export default router;