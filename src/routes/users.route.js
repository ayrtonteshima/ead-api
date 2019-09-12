const userHandler = require('../handlers/users.handler');
const userSchema = require('../schemas/users.schema');

module.exports = [
  {
    method: 'POST',
    path: '/users',
    handler: userHandler.create,
    options: {
      validate: {
        payload: userSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/users',
    handler: (req, h) => {
      return []
    }
  }
];
