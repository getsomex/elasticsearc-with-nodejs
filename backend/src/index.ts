import express, { Application, Request, Response } from 'express';
import { ApiResponse } from '@elastic/elasticsearch';
import esClient from './connections/elasticsearch';
import redisClient from './connections/redis';
import cors from 'cors';
import 'dotenv/config';

const app: Application = express();
const PORT = 9999;
app.use(express.json());
const INDEX = 'restaurants';

redisClient.on('error', (err) => {
  console.log(err);
  console.log('Error occured while connecting or accessing redis server');
});
app.use(cors());
// Create data
app.post('/restaurant', async (req: Request, res: Response) => {
  try {
    // let body: any = [];

    // cities.forEach((city: any) => {
    //   body.push({
    //     index: {
    //       _index: 'restaurants',
    //     },
    //   });
    //   body.push(city);
    // });

    // console.log(body);

    // await esClient.bulk({ body: body });
    // const doc: RequestParams.Index = {
    //   index: INDEX,
    //   body: {
    //     ...req.body,
    //   },
    // };

    // for (let i = 0; i <= 1000000; i++) {
    //   (doc.body as any)['random'] = String(i);
    //   await esClient.index(doc);
    // }

    res.status(201).json({
      message: 'Success ✅',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Failed❌',
    });
  }
});
interface Should {
  wildcard: {
    [key: string]: any;
  };
}
interface Body {
  query: {
    bool: {
      should: Should[];
    };
  };
}

// Search
app.get('/search', async (req: Request, res: Response) => {
  try {
    const isValidIndex: ApiResponse = await esClient.indices.exists({
      index: INDEX,
    });
    if (isValidIndex.body) {
      const { s } = req.query;
      const filterSearchString =
        typeof s === 'string' ? s.toLocaleLowerCase().trim() : '';
      // TODO: Refactor
      const wildCardOption = [
        {
          wildcard: {
            country: '*' + filterSearchString + '*',
          },
        },
        {
          wildcard: {
            name: '*' + filterSearchString + '*',
          },
        },
        // {
        //   wildcard: {
        //     'food.items': '*' + filterSearchString + '*',
        //   },
        // },
        // {
        //   wildcard: {
        //     random: '*' + filterSearchString + '*',
        //   },
        // },
      ];

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
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong😰',
    });
  }
});
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
