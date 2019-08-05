const userHandler = require('../handlers/users.handler');
const userSchema = require('../schemas/users.schema');

module.exports = [
  {
    method: 'POST',
    path: '/users',
    handler: userHandler.create
  }
];
