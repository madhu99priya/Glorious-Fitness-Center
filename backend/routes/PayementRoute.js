import express from 'express'
import Stripe from 'stripe'

const router = express.Router();



const stripe = Stripe('sk_test_51PM9dJ2MpEBmq3acidYub1EivmYfEk34Ai9GEd1IAevgKuAZODNxfCFDty8tXquttvMTW4W1IchYoXs2A22mWWCg00tfwUDeZO'); 

router.post('/', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


export default router;