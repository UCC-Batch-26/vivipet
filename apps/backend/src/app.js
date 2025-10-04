import { errorHandler } from '#modules/common/middleware/error-handler.js';
//import sampleRoutes from '#modules/samples/routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import process from 'node:process';
import { db } from './db.js';
import authRoutes from '#modules/auth/routes.js';
import petRoutes from '#modules/pets/routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('port', PORT);

app.get('/ping', cors({ origin: '*' }), (_, res) => {
  res.status(200).json({
    message: 'PONG',
  });
});

// All Global middleware
app.use(
  cors({
    origin: (origin, callback) => {
      const whitelist = ['http://localhost:5173', 'https://vivipet.app', 'https://www.vivipet.app'];

      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('combined'));

// Database connection
await db(process.env.DB_URI);

// Sample route
//app.use('/sample', sampleRoutes);
app.use('/auth', authRoutes);
app.use('/pet', petRoutes);

// Error handling middleware, MUST always be the last
app.use(errorHandler);

export default app;
