require('dotenv-safe').config();
const server = require('./server');
const routes = require('./routes');

require('./services/mongo.service');

const init = async () => {
  server.route(routes);

  await server.start();
  console.log('Server running on %ss', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
