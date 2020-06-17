import userHandler from '../handlers/users.handler';
import userSchema from '../schemas/users.schema';

export default [
  {
    method: 'POST',
    path: '/users',
    handler: userHandler.create,
    options: {
      validate: {
        payload: userSchema,
      },
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/users',
    handler: userHandler.getAll,
  },
];
