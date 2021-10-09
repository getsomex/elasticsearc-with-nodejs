import Mongoose from 'mongoose';
import mongoRestaturantSchema from '../schema/mongoRestaturantSchema';

const restaurantSchema = new Mongoose.Schema(mongoRestaturantSchema);

const Restaurant = Mongoose.model('restaurants', restaurantSchema);
export default Restaurant;
