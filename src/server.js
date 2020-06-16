import Hapi from '@hapi/hapi';
import hapiAuthJwt2 from 'hapi-auth-jwt2';
import routes from './routes';
import jwtStrategy from './auth/strategies/JWT';
import isEmpty from './utils/object.helper';

const { PORT } = process.env;
const { HOST } = process.env;

const server = Hapi.server({
  port: PORT,
  host: HOST,
});

// Definindo rotas
server.route(routes);

const initializePlugins = async () => {
  if (isEmpty(server.registrations)) {
    await server.register(hapiAuthJwt2);

    // Definindo estratégia de autenticação
    server.auth.strategy(jwtStrategy.name, jwtStrategy.schema, jwtStrategy.options);
    server.auth.default(jwtStrategy.name);
  }
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

export default { init, start };
