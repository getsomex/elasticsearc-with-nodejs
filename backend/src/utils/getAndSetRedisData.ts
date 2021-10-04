import redisClient from '../connections/redis';
import { ElasticResponse } from '../interfaces/Elsticsearch';
const getAndSetRedisData = (
  key: string,
  cb: Function
): Promise<ElasticResponse> => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (err, data: string | null) => {
      if (err) return reject(err);
      if (data !== null) {
        return resolve(JSON.parse(data));
      }
      const newData = await cb();
      redisClient.set(
        key,
        JSON.stringify(newData),
        'EX',
        Number(process.env.REDIS_EXPIRE_DURATION),
        (err, reply) => {
          if (err) {
            return reject(err);
          }
          return resolve(newData);
        }
      );
    });
  });
};

export default getAndSetRedisData;
