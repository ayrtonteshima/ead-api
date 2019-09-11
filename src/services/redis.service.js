const Redis = require('ioredis');

let redis = null;

exports.connect = () => {
  redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  })
};

exports.get = () => {
  if (!redis) {
    throw new Error('REDIS_NOT_INITIALIZED');
  }

  return redis;
};
