import redis from 'redis';
import 'dotenv/config';

const PORT: number = Number(process.env.REDIS_PORT);

const redisClient = redis.createClient(PORT);
redisClient.on('error', (err) => {
  console.log('Error ' + err);
});

export default redisClient;
