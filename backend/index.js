import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import memberRoute from './routes/memberRoute.js';
import tempmemberRoute from './routes/tempmemberRoute.js';
import PaymentRoute from './routes/PayementRoute.js';
import noticeRoute from './routes/noticeRoute.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Access environment variables
const PORT = process.env.PORT;
const mongoDBURL = process.env.MONGO_URI;

// Middleware for parsing JSON
app.use(express.json());

// Middleware for handling CORS
app.use(cors());

// Test route
app.get('/', (req, res) => {
  return res.status(234).send('Welcome to Glorious');
});

// API routes
app.use('/members', memberRoute);
app.use('/register', tempmemberRoute);
app.use('/unapproved', tempmemberRoute);
app.use('/approve', tempmemberRoute);
app.use('/unapprove', tempmemberRoute);
app.use('/payments', PaymentRoute);
app.use('/notices', noticeRoute);

// Connect to MongoDB
mongoose.connect(mongoDBURL)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 App is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error);
  });
