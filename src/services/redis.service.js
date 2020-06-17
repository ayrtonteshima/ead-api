import Redis from 'ioredis';

let redis = null;

export const connect = () => {
  redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  });
};

export const get = () => {
  if (!redis) {
    throw new Error('REDIS_NOT_INITIALIZED');
  }

  return redis;
};

connect();

export default {
  connect,
  get,
};
