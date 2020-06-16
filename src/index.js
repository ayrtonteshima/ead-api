/* eslint-disable no-console */
import dotenv from 'dotenv-safe';
import Mongo from './services/mongo.service';
import RedisClient from './services/redis.service';
import Server from './server';

const init = async () => {
  // Inicializando servidor
  dotenv.config();
  Mongo.get();
  RedisClient.get();
  const server = (await Server.start()).info.uri;
  console.log('Server running on %ss', server);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
