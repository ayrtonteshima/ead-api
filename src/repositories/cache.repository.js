import Redis from '../services/redis.service';

const RedisClient = Redis.get();

export const set = (key, value, seconds) => (
  RedisClient.set(key, value, 'EX', seconds)
);

export const exists = (key) => RedisClient.exists(key);

export const del = (key) => RedisClient.del(key);
