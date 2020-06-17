import dotenv from 'dotenv-safe';
import mongoClient from './services/mongo.service';
import redisClient from './services/redis.service';

import { start } from './server';

const init = async () => {
  // Inicializando servidor
  dotenv.config();
  mongoClient.get();
  redisClient.connect();

  const server = await start();
  console.log('Server running on %ss', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
