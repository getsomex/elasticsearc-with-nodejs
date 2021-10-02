/**
 * libraries
 */
import cors from 'cors';
import 'dotenv/config';
import App from './connections/server';
/**
 * Custom modules
 */
import restaurantRouter from './routes/restaurant';
import globalErrorController from './controller/errorController/globalErrorController';
import app from './connections/server';

App.use(cors());

/**
 * Routes
 */
// Restaurants
App.use('/restaurants', restaurantRouter);
/**
 * ErroController
 */

app.use(globalErrorController);
