import Redis from 'ioredis';

let redis = null;

const config = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  connectionName: 'ead-cache',
};

const connect = () => {
  redis = new Redis(config);
};

const get = () => {
  if (!redis) {
    throw new Error('REDIS_NOT_INITIALIZED');
  }
  return redis;
};

connect();

export default { get };
