// for the purpose of new user registrations-> when the user reg, it is going through the admin, if the admin approve, the data are stored in the database


import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tempMemberSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 14 },
    category: { type: String, required: true },
    isApproved: { type: Boolean, default: false }
});

export const TempMember = mongoose.model('TempMember', tempMemberSchema);
