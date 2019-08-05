const Hapi = require('@hapi/hapi');

const server = Hapi.server({
  port: process.env.PORT,
  host: process.env.HOST,
});

module.exports = server;