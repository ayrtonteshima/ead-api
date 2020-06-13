import test from 'ava';
import sinon from 'sinon';
import Redis from '../../../src/services/redis.service';
import { init } from '../../../src/server';

let server;

sinon.stub(Redis, 'get').returns({});

const auth = {
  strategy: 'jwt',
  credentials: 'Bearer abc',
};

test.before(async () => {
  server = await init();
});

test('should return empty array', async (t) => {
  const res = await server.inject({
    method: 'get',
    url: '/users',
    auth,
  });
  t.is(res.payload, '[]');
});

test('should return users array', async (t) => {
  const res = await server.inject({
    method: 'get',
    url: '/users',
    auth,
  });
  t.is(res.payload, '[]');
});
