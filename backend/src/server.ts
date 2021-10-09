import mongoose from 'mongoose';
import redis from 'redis';
import 'dotenv/config';

import app from './index';
const PORT = 9999;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// Mongodb
const MONGO_CONNECTION_URI = process.env.MONOGO_CONNCTION_URI || '';
const MONGO_DB = process.env.MONGO_DB || '';

mongoose
  .connect(MONGO_CONNECTION_URI, {
    useNewUrlParser: true,
    dbName: MONGO_DB,
  } as mongoose.ConnectOptions)
  .then(() => console.log('Connected to Mongo Database'));
