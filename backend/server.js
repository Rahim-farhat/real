import express from 'express';
import path from 'path';
import cors from 'cors';
//import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
//import seedRouter from './routes/seedRoutes.js';
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

//app.use('/api/seed', seedRouter);

app.use(
  cors({
    origin: '*',
  })
);

app.use('/api/events', eventRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/dist/index.html'))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
