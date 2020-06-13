import test from 'ava';
import sinon from 'sinon';
import Redis from '../../../src/services/redis.service';
import { init } from '../../../src/server';

let server;

sinon.stub(Redis, 'get').returns({});

test.before(async () => {
  server = await init();
});


const requestDefaults = {
  method: 'POST',
  url: '/login',
  payload: {},
};

test('endpoint test | POST /login | Invalid password -> 404 Not Found', async (t) => {
  const request = {
    ...requestDefaults,
    payload: {
      email: 'caracara@plancus.com',
      password: '111111111111111',
    },
  };

  const response = await server.inject(request);
  t.is(response.statusCode, 400, 'status code is 400');
});

test('endpoint test | POST /login | Invalid request payload input -> 400 Bad Request', async (t) => {
  const request = {
    ...requestDefaults,
    payload: {
      email: 'a',
    },
  };

  const response = await server.inject(request);
  t.is(response.statusCode, 400, 'status code is 400');
});

test('endpoint test | POST /login | Valid login -> 200 Ok', async (t) => {
  const request = {
    ...requestDefaults,
    payload: {
      email: 'caracara@plancus.com',
      password: '1234567323',
    },
  };

  const response = await server.inject(request);
  t.is(response.statusCode, 200, 'status code is 200');
});
