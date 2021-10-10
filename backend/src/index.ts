/**
 * libraries
 */
import cors from 'cors';
import 'dotenv/config';
import express, { Application } from 'express';

/**
 * Custom modules
 */
import restaurantRouter from './routes/restaurant';
import globalErrorController from './controller/errorController/globalErrorController';
import BaseError from './utils/BaseError';
import { ERROR_CODES } from './utils/constants';
const app: Application = express();

app.use(express.json());

app.use(cors());

/**
 * Routes
 */
// Restaurants
app.use('/restaurants', restaurantRouter);
/**
 * ErroController
 */

app.use(globalErrorController);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 400;
  next(
    new BaseError(
      404,
      `Can't find ${req.originalUrl} on this server`,
      ERROR_CODES.E10005
    )
  );
});

export default app;
