import express from 'express';
import cors from 'cors';
//import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import eventRouter from './routes/eventRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use('/api/seed', seedRouter);
const port = process.env.PORT || 5000;

app.use(cors());

app.use('/api/events', eventRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
