import { Request, Response } from 'express';
import { ApiResponse, RequestParams } from '@elastic/elasticsearch';
import esClient from '../connections/elasticsearch';
import redisClient from '../connections/redis';
import { makeWildCard, Wildcard } from '../utils/makeWildCard';
const INDEX = 'restaurants';

// redisClient.on('error', (err) => {
//   console.log(err);
//   console.log('Error occured while connecting or accessing redis server');
// });
export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const doc: RequestParams.Index = {
      index: INDEX,
      body: {
        ...req.body,
      },
    };
    await esClient.index(doc);

    res.status(201).json({
      message: 'Success ✅',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Failed❌',
    });
  }
};

interface Body {
  query: {
    bool: {
      should: Wildcard[];
    };
  };
}

// Search
export const searchRestaurants = async (req: Request, res: Response) => {
  try {
    const isValidIndex: ApiResponse = await esClient.indices.exists({
      index: INDEX,
    });
    if (isValidIndex.body) {
      const { s } = req.query;

      // filtering the string
      const filterSearchString =
        typeof s === 'string' ? s.toLocaleLowerCase().trim() : '';

      // Creating wildcards for query

      const wildCardOption = makeWildCard(
        ['country', 'name'],
        filterSearchString
      );

      // TODO: create reusable query builder
      const body: Body = {
        query: {
          bool: {
            should: wildCardOption,
          },
        },
      };

      const result: ApiResponse = await esClient.search({
        index: INDEX,
        from: 0,
        size: 10,
        body: body,
      });

      res.status(200).json({
        message: 'Success✅',
        count: result.body.hits.hits.length,
        data: result.body.hits.hits,
      });
    } else {
      res.status(400).json({
        message: 'Not valid query🥲',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong😰',
    });
  }
};
