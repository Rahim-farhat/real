import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    //image: { type: String, required: true },
    where: { type: String, required: true },

    //category: { type: String, required: true },
    //description: { type: String, required: true },
    owner: { type: String, required: true },
    date: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);
export default Event;
