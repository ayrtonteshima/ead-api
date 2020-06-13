import Redis from 'ioredis';

let redis = null;

const isConnected = () => {
  if (!redis) throw new Error('REDIS_NOT_INITIALIZED');
};

const connect = () => {
  redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  });
};

const get = () => {
  redis ? isConnected() : connect();
  return redis;
};

export default { connect, get };
