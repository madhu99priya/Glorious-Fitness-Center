import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: true },
  plan: { type: String, required: true }, // '1 month', '6 months', '1 year'
  isActive: { type: Boolean, default: true } // New field to indicate if the payment is active
});

// Middleware to automatically set isActive based on the payment date and plan duration
paymentSchema.pre('save', function(next) {
  const payment = this;

  // Define plan durations in days
  const planDurations = {
    '1 month': 30,
    '6 months': 180,
    '1 year': 365,
  };

  const paymentDate = new Date(payment.paymentDate);
  const expirationDate = new Date(paymentDate);
  expirationDate.setDate(paymentDate.getDate() + planDurations[payment.plan]);

  // Set isActive based on the current date and the expiration date
  payment.isActive = new Date() <= expirationDate;

  next();
});

export const Payment = mongoose.model('Payment', paymentSchema);
