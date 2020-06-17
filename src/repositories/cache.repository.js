import Redis from '../services/redis.service';

const redisClient = Redis.get();

const set = (key, value, seconds) => (
  redisClient.set(key, value, 'EX', seconds)
);

const exists = (key) => redisClient.exists(key);

const del = (key) => redisClient.del(key);

export default {
  set,
  exists,
  del,
};
