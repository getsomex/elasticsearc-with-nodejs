interface Food {
  food_name: String;
  category: Number;
  price: number;
}
interface Restaurant {
  restaurant_name: String;
  category: Number;
  city: Number;
  location_name: String;
  lat: Number;
  long: Number;
  foods?: Food[];
  ratings?: Number;
}
export default Restaurant;
