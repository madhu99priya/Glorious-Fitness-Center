import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Defining the Member schema
const memberSchema = new Schema(
    
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number, min: 14 },
        // new adding from here
        category: { type: String, required: true },
        isApproved: { type: Boolean, default: false } 
    
    }
);

// exporting the member model
export const Member = mongoose.model('Member', memberSchema);
