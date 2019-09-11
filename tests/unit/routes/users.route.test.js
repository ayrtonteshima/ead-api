const test = require('ava');
const sinon = require('sinon');
const Redis = require('../../../src/services/redis.service');

sinon.stub(Redis, 'get').returns({});

const { init } = require('../../../src/server');

const auth = {
  strategy: 'jwt',
  credentials: 'Bearer abc'
};

let server;

test.before(async t => {
  server = await init();
});

test('should return empty array', async (t) => {
  const res = await server.inject({
    method: 'get',
    url: '/users',
    auth,
  });
  t.is(res.payload, '[]');
})