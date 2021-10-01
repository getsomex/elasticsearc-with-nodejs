import express, { Application, Request, Response } from 'express';
import { Client, ApiResponse, RequestParams } from '@elastic/elasticsearch';

const app: Application = express();
const PORT = 9999;
app.use(express.json());
const client = new Client({
  node: 'http://localhost:9200/',
});

const INDEX = 'restaurants';

// Create data
app.post('/restaurant', async (req: Request, res: Response) => {
  try {
    const doc: RequestParams.Index = {
      index: INDEX,
      body: {
        ...req.body,
      },
    };

    await client.index(doc);

    res.status(201).json({
      message: 'Success ✅',
    });
  } catch (error) {
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
    const isValidIndex: ApiResponse = await client.indices.exists({
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
            location: '*' + filterSearchString + '*',
          },
        },
        {
          wildcard: {
            name: '*' + filterSearchString + '*',
          },
        },
        {
          wildcard: {
            food: '*' + filterSearchString + '*',
          },
        },
      ];

      const body: Body = {
        query: {
          bool: {
            should: wildCardOption,
          },
        },
      };

      const result: ApiResponse = await client.search({
        index: INDEX,
        from: 0,
        body: body,
      });

      res.status(200).json({
        message: 'Success✅',
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
});
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
