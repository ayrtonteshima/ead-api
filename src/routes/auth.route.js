const loginHandler = require('../handlers/login.handler');

module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler.login,
  }
];
