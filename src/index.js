require('dotenv-safe').config();
const hapiAuthJwt2 = require('hapi-auth-jwt2');
const server = require('./server');
const routes = require('./routes');

const jwtStrategy = require('./auth/strategies/JWT');

const { ALGORITHM } = require('./auth/confs');

require('./services/mongo.service');

const init = async () => {
  server.route(routes);

  await server.register(hapiAuthJwt2);

  server.auth.strategy(jwtStrategy.name, jwtStrategy.schema, jwtStrategy.options);

  server.auth.default(jwtStrategy.name);

  await server.start();
  console.log('Server running on %ss', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
