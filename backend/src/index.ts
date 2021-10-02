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

App.use(cors());

// Restaurants
App.use('/restaurants', restaurantRouter);
