import test from 'ava';
import sinon from 'sinon';
import Redis from '../../../src/services/redis.service';
import Server from '../../../src/server';
import userRepository from '../../../src/repositories/users.repository';

let server;

sinon.stub(Redis, 'get').returns({});
sinon.stub(userRepository, 'findByEmail').returns({});

const auth = {
  strategy: 'jwt',
  credentials: 'Bearer abc',
};

test.before(async () => {
  server = await Server.init();
});

test.after(async () => {
  await server.stop();
});

const requestDefaults = {
  method: 'POST',
  url: '/login',
  auth,
  payload: {},
};

test('endpoint test | POST /login | Invalid user -> 404 Not Found', async (t) => {
  const request = {
    ...requestDefaults,
    payload: {
      email: 'test@tester.com',
      password: '111111111111111',
    },
  };

  const { result } = await server.inject(request);
  t.is(result.statusCode, 404, 'E-mail ou senha inválido');
});

test('endpoint test | POST /login | Invalid request payload input -> 400 Bad Request', async (t) => {
  const request = {
    ...requestDefaults,
    payload: {
      email: 'a',
      password: 'a',
    },
  };

  const { result } = await server.inject(request);
  t.is(result.statusCode, 400, 'Bad Request');
});
