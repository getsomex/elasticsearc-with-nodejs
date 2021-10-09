/**
 * Create Elasticsearch migration files😀
 */
import esClient from '../../src/connections/elasticsearch';
// create
const INDEX = 'restaurants';
export const up = async () => {
  await esClient.indices.create({
    index: INDEX,
    body: {
      mappings: {
        properties: {
          restaurant_name: {
            type: 'text',
            fields: {
              keyword: {
                type: 'keyword',
              },
            },
          },
          category: {
            type: 'integer',
          },

          city: {
            type: 'integer',
          },
          location_name: {
            type: 'text',
            fields: {
              keyword: {
                type: 'keyword',
              },
            },
          },
          lat: {
            type: 'integer',
            fields: {
              keyword: {
                type: 'keyword',
              },
            },
          },
          long: {
            type: 'integer',
          },

          foods: {
            properties: {
              food_name: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword',
                  },
                },
              },
              category: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword',
                  },
                },
              },
            },
          },

          search_count: {
            type: 'integer',
          },
        },
      },
    },
  });
};
// rollback
export const down = async () => {
  await esClient.indices.delete({
    index: INDEX,
  });
};
