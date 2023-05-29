import express from 'express';
import data from './data.js';

const app = express();
app.get('/api/events', (req, res) => {
  res.send(data.events);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at https://localhost:${port}`);
});
