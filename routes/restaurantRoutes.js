import express from 'express';
import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  getRestaurantsByOwner
} from '../controllers/restaurantController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getAllRestaurants)
  .post(protect, authorize('restaurant_owner', 'admin'), createRestaurant);

router.route('/owner')
  .get(protect, authorize('restaurant_owner', 'admin'), getRestaurantsByOwner);

router.route('/:id')
  .get(getRestaurantById)
  .put(protect, authorize('restaurant_owner', 'admin'), updateRestaurant);

export default resturantRouter;