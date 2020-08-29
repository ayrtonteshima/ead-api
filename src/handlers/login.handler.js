const boom = require('@hapi/boom');
const authenticate = require('../auth/authenticate.auth');
const userRepository = require('../repositories/users.repository');

const {
  ERR_INVALID_PASSWORD,
  ERR_INVALID_TOKEN,
  ERR_USER_NOT_FOUND,
} = require('../utils/errorTypes');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
const login = async (req, h) => {
  const { email, password } = req.payload;
  try {
    const { user, token } = await authenticate.login(email, password);
    await userRepository.setCache(user);
    return h.response({ token }).code(200);
  } catch (exception) {
    throwsLoginException(exception);
  }
};

const throwsLoginException = (exception) => {
  switch (exception.message) {
    case ERR_INVALID_PASSWORD:
      throw boom.notFound('Invalid email or password.');
    case ERR_INVALID_TOKEN:
      throw boom.badImplementation('Invalid token.');
    case ERR_USER_NOT_FOUND:
      throw boom.notFound('User not found.');
    default:
      throw boom.badImplementation(exception);
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
module.exports = {
  login,
};
