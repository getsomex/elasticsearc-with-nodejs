import { NextFunction, Request, Response } from 'express';
import { ApiResponse, RequestParams } from '@elastic/elasticsearch';
import esClient from '../connections/elasticsearch';
import { makeWildCard, Wildcard } from '../utils/makeWildCard';
import catchAsyncError from '../catchAsyncError';
import getAndSetRedisData from '../utils/getAndSetRedisData';
import { ElasticResponse } from '../interfaces/Elsticsearch';
import Restaurant from '../model/restaurant';
import RestaurantInterface from '../interfaces/RestaurantInterface';
const INDEX = 'restaurants';

export const createRestaurant = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const body: RestaurantInterface = req.body;
    const response = await Restaurant.create(body);
    const mongoId = response._id.toString();
    if (!mongoId) {
      next(Error('Could not create data'));
      return;
    }
    if (mongoId) {
      const esBody = { ...body, mongo_id: mongoId };
      const doc: RequestParams.Index = {
        index: INDEX,
        body: {
          ...esBody,
        },
      };
      await esClient.index(doc);
    }
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
    // Elastic index check
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

    /**
     * Data get and Create hanler with redis
     */
    const createElasticData = async (): Promise<ElasticResponse> => {
      const wildCardOption = makeWildCard(
        ['country', 'name'],
        filterSearchString
      );
      const body = {
        query: {
          query_string: {
            query: `*${filterSearchString}*`,
            fields: ['location_name', 'restaurant_name', 'foods.food_name'],
          },
        },
      };
      const result: ApiResponse = await esClient.search({
        index: INDEX,
        from: 0,
        size: 10,
        body: body,
      });
      console.log(result.body.suggest);
      return result.body.hits;
    };

    const results = await getAndSetRedisData(
      filterSearchString,
      createElasticData
    );

    res.status(200).json({
      message: 'success',
      count: results.hits.length,
      total: results.total.value,
      data: results.hits,
    });
  }
);
