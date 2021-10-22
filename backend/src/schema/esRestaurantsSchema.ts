const mappings = {
  settings: {
    analysis: {
      filter: {
        autocomplete_filter: {
          type: 'edge_ngram',
          min_gram: 2,
          max_gram: 20,
          token_chars: ['letter', 'digit', 'punctuation', 'symbol'],
        },
      },
      analyzer: {
        autocomplete: {
          type: 'custom',
          tokenizer: 'whitespace',
          filter: ['lowercase', 'asciifolding', 'autocomplete_filter'],
        },
      },
    },
  },

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
        analyzer: 'autocomplete',
        search_analyzer: 'standard',
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
        analyzer: 'autocomplete',
        search_analyzer: 'standard',
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
            analyzer: 'autocomplete',
            search_analyzer: 'standard',
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
      logo: {
        type: 'text',
      },
      ratings: {
        type: 'integer',
      },
    },
  },
};

export default mappings;
