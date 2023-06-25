import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    //image: { type: String, required: true },
    where: { type: String, required: true },
    categories: { type: [String], required: true },
    types: { type: [String], required: true },
    //category: { type: String, required: true },
    //description: { type: String, required: true },
    owner: { type: String, required: true },
    target: { type: String, required: true },
    price: { type: String, required: true },
    start_d: { type: Number },
    end_d: { type: Number },
    start_m: { type: String, default: 'Soon' },
    end_m: { type: String, default: 'Soon' },
    year: { type: Number },
    time: { type: String, default: 'Soon' },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);
export default Event;
