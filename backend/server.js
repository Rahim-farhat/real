import express from 'express';
import cors from 'cors';
import data from './data.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/api/events', (req, res) => {
  res.send(data.events);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
