import loginHandler from '../handlers/login.handler';
import logoutHandler from '../handlers/logout.handler';
import loginSchema from '../schemas/login.schema';

export default [
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler.login,
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
    handler: logoutHandler.logout,
  },
];
