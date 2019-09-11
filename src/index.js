require('dotenv-safe').config();
require('./services/mongo.service');
require('./services/redis.service').connect();

const { start } = require('./server');

const init = async () => {
  // Inicializando servidor
  const server = await start();
  console.log('Server running on %ss', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
