import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Event from '../models/eventModel.js';

const eventRouter = express.Router();

eventRouter.get('/', async (req, res) => {
  const events = await Event.find();
  res.send(events);
});
/*
eventRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};

    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const events = await Event.find({
      ...queryFilter,
      ...categoryFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countEvents = await Event.countDocuments({
      ...queryFilter,
      ...categoryFilter,
    });
    res.send({
      events,
      countEvents,
      page,
      pages: Math.ceil(countEvents / pageSize),
    });
  })
);
*/
eventRouter.get('/search', async (req, res) => {
  const { category } = req.query;

  try {
    const events = await Event.find({ categories: category });
    res.send(events);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

eventRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    let categories = await Event.find().distinct('categories');
    console.log('categories');

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
