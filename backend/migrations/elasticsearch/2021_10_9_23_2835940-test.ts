/**
 * Create Elasticsearch migration files😀
 */
import esClient from '../../src/connections/elasticsearch';
import esRestaurantSchema from '../../src/schema/esRestaurantsSchema';

// create
const INDEX = 'restaurants';
export const up = async () => {
  await esClient.indices.create({
    index: INDEX,
    body: {
      esRestaurantSchema,
    },
  });
};
// rollback
export const down = async () => {
  await esClient.indices.delete({
    index: INDEX,
  });
};
