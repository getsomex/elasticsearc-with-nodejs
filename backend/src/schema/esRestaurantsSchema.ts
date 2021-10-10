const mappings = {
  mappings: {
    properties: {
      mongo_id: {
        type: 'text',
      },
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
          price: {
            type: 'integer',
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
      ratings: {
        type: 'integer',
      },
    },
  },
};

export default mappings;
