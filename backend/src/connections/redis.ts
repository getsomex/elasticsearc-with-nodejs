import redis from 'redis';
import 'dotenv/config';
const PORT: number = Number(process.env.REDIS_PORT);

const redisClient = redis.createClient(PORT);

export default redisClient;
