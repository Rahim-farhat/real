import express from 'express';
import cors from 'cors';
import data from './data.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/api/events', (req, res) => {
  res.send(data.events);
});

app.get('/api/events/slug/:slug', (req, res) => {
  const event = data.events.find((x) => x.slug === req.params.slug);
  if (event) {
    res.send(event);
  } else {
    res.status(404).send({ message: 'Event not found' });
  }
  res.send(data.events);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
