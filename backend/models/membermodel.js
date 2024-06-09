import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Defining the Member schema
const memberSchema = new Schema(
    
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number, min: 14 },
        category: { type: String, required: true },
        isApproved: { type: Boolean, default: false },
        payments: [{ type: Schema.Types.ObjectId, ref: 'Payment' }] // Adding payments reference 
    
    }
);

// exporting the member model
export const Member = mongoose.model('Member', memberSchema);
