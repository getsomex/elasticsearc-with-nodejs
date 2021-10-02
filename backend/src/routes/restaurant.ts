import express from 'express';

import {
  createRestaurant,
  searchRestaurants,
} from '../controller/restaurantController';
const router = express.Router();

// Create Restaurant
router.route('/').post(createRestaurant);
// GET Search results
router.route('/search').get(searchRestaurants);

export default router;
