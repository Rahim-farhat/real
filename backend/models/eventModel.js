import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  images: { type: [String] },
  where: { type: String, required: true },
  categories: { type: [String], required: true },
  sponsors: { type: [String] },
  types: { type: [String], required: true },
  register: { type: String },
  map: { type: String },
  phone: { type: String },
  faq: { type: String },
  details: { type: String },
  boxcolor: { type: String, default: 'lightgrey' },
  textheadcolor: { type: String, default: '#bfeeff' },
  timeline: {
    type: [
      {
        t_title: { type: String },
        t_when: { type: String },
        t_details: { type: String },
      },
    ],
  },
  owner: { type: String, required: true },
  target: { type: String, required: true },
  price: { type: String, required: true },
  start_d: { type: Number },
  end_d: { type: Number },
  start_m: { type: Number, default: 'Soon' },
  end_m: { type: Number, default: 'Soon' },
  year: { type: Number },
  time: { type: String, default: 'Soon' },
  image: { type: String },
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
