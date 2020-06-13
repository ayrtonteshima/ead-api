import dotenv from 'dotenv-safe';
import MongoClient from './services/mongo.service';
import RedisClient from './services/redis.service';
import { start } from './server';

const init = async () => {
  // Inicializando servidor
  dotenv.config();
  RedisClient.get();
  MongoClient.get();
  const server = await start();
  console.log('Server running on %ss', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
