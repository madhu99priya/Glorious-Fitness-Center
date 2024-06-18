import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noticeSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;
