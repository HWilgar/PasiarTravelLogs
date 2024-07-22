import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import db from './config/db.js';
import userRoutes from './routes/user.routes.js';
import tripRoutes from './routes/trip.routes.js';
import destinationRoutes from './routes/destination.routes.js';
// import { pageNotFound, errorHandler } from './middleswares/error.middlewar.js';

dotenv.config();

const app = express();
const baseURL = "/api/v1";

db();
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(`${baseURL}/users`, userRoutes);
app.use(`${baseURL}/trips`, tripRoutes);
app.use(`${baseURL}/destinations`, destinationRoutes);

// app.use(pageNotFound);
// app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);