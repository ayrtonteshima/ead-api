const boom = require('@hapi/boom');
const auth = require('../auth/authenticate.auth');
const userRepository = require('../repositories/users.repository');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
const logout = async (req, h) => {
  const { credentials, token } = req.auth;
  try {
    await Promise.all([
      auth.logout(token),
      userRepository.removeCache(credentials.data.user_id),
    ]);
    return h.response().code(200);
  } catch (exception) {
    throwsLogoutException(exception);
  }
};

const throwsLogoutException = (exception) => {
  console.error(exception);
  throw boom.badImplementation();
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
module.exports = {
  logout,
};
