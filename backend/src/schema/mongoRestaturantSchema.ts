const foodSchema = {
  category: Number,
  food_name: String,
  price: Number,
};

export default {
  restaurant_name: {
    type: String,
    required: true,
  },
  category: Number,
  city: {
    type: Number,
    required: true,
  },
  location_name: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  foods: [foodSchema],
  ratings: Number,
};
