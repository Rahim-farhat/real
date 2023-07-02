/*
import express from 'express';
import Event from '../models/eventModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
    await Event.deleteMany({});
    const createdEvents = await Event.insertMany(data.events);
    res.status(200).send({ createdEvents });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error seeding events' });
  }
});

export default seedRouter;
*/
