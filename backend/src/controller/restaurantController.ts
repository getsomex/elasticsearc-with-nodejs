import { Request, Response } from 'express';
import { ApiResponse, RequestParams } from '@elastic/elasticsearch';
import esClient from '../connections/elasticsearch';
import redisClient from '../connections/redis';
import { makeWildCard, Wildcard } from '../utils/makeWildCard';
import catchAsyncError from '../catchAsyncError';

const INDEX = 'restaurants';

export const createRestaurant = catchAsyncError(
  async (req: Request, res: Response) => {
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
  }
);

/**
 * TBD: Create separate file for interfaces??
 */
interface Body {
  query: {
    bool: {
      should: Wildcard[];
    };
  };
}

// Search
export const searchRestaurants = catchAsyncError(
  async (req: Request, res: Response) => {
    const isValidIndex: ApiResponse = await esClient.indices.exists({
      index: INDEX,
    });
    if (!isValidIndex.body) {
      res.status(400).json({
        message: 'Not valid query🥲',
      });
      return;
    }
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
  }
);
