import test from 'ava';
import sinon from 'sinon';
import Server from '../../../src/server';
import Redis from '../../../src/services/redis.service';

let server;

sinon.stub(Redis, 'get').returns({});

test.before(async () => {
  server = await Server.init();
});

test.after(async () => {
  server.stop();
});

test('endpoint test | GET /users | list users -> 401 Unauthorized', async (t) => {
  const { result } = await server.inject({
    method: 'get',
    url: '/users',
  });
  t.is(result.statusCode, 401);
});

test('endpoint test | POST /users | create users -> 400 Bad Request', async (t) => {
  const { result } = await server.inject({
    method: 'post',
    url: '/users',
    payload: { },
  });
  t.is(result.statusCode, 400);
});
