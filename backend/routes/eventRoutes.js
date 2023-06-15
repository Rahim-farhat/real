import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Event from '../models/eventModel.js';

const eventRouter = express.Router();

eventRouter.get('/', async (req, res) => {
  const events = await Event.find();
  res.send(events);
});

eventRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Event.find().distinct('category');
    res.send(categories);
  })
);

eventRouter.get('/slug/:slug', async (req, res) => {
  const event = await Event.findOne({ slug: req.params.slug });
  if (event) {
    res.send(event);
  } else {
    res.status(404).send({ message: 'Event Not Found' });
  }
});
eventRouter.get('/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) {
    res.send(event);
  } else {
    res.status(404).send({ message: 'Event Not Found' });
  }
});

export default eventRouter;
