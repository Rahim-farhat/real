import express from 'express';
import Event from '../models/eventModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Event.deleteMany({});
  const createdEvents = await Event.insertMany(data.events);
  res.send({ createdEvents });
});
export default seedRouter;
