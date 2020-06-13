import login from '../handlers/login.handler';
import { logout } from '../handlers/logout.handler';
import loginSchema from '../schemas/login.schema';

export default [
  {
    method: 'POST',
    path: '/login',
    handler: login,
    options: {
      auth: false,
      validate: {
        payload: loginSchema,
      },
    },
  },
  {
    method: 'POST',
    path: '/logout',
    handler: logout,
  },
];
