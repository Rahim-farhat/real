import express from 'express';
import Event from '../models/eventModel.js';

const eventRouter = express.Router();

eventRouter.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

eventRouter.get('/search', async (req, res) => {
  const { category } = req.query;

  try {
    const events = await Event.find({ categories: category });
    res.send(events);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

eventRouter.get('/categories', async (req, res) => {
  try {
    const categories = await Event.distinct('categories');
    res.send(categories);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

eventRouter.get('/slug/:slug', async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    if (event) {
      res.send(event);
    } else {
      res.status(404).send({ message: 'Event Not Found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

eventRouter.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.send(event);
    } else {
      res.status(404).send({ message: 'Event Not Found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

export default eventRouter;
