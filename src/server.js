const Hapi = require('@hapi/hapi');

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const server = Hapi.server({
  port: PORT,
  host: HOST,
});

module.exports = server;