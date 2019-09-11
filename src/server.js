const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const hapiAuthJwt2 = require('hapi-auth-jwt2');
const jwtStrategy = require('./auth/strategies/JWT');

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const server = Hapi.server({
  port: PORT,
  host: HOST,
});

// Definindo rotas
server.route(routes);

const initializePlugins = async () => {
  await server.register(hapiAuthJwt2);

  // Definindo estratégia de autenticação
  server.auth.strategy(jwtStrategy.name, jwtStrategy.schema, jwtStrategy.options);
  server.auth.default(jwtStrategy.name);
};

const start = async () => {
  await initializePlugins();
  await server.start();

  return server;
};

const init = async () => {
  await initializePlugins();
  await server.initialize();

  return server;
};

module.exports = {
  start,
  init,
};

