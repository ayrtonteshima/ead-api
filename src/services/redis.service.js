const Redis = require('ioredis');

module.exports = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
});
