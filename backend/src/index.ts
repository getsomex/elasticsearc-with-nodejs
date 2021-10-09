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

export default app;
