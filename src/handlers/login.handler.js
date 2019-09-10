const boom = require('boom');
const authenticate = require('../auth/authenticate.auth');
const userRepository = require('../repositories/users.repository');

const {
  ERR_INVALID_PASSWORD,
  ERR_INVALID_TOKEN,
  ERR_USER_NOT_FOUND,
} = require('../utils/errorTypes');

const login = async (req, h) => {
  const { email, password } = req.payload;

  try {
    const { user, token } = await authenticate.login(email, password);

    await userRepository.setCache(user);

    return h.response({ token }).code(200);
  } catch (e) {
    switch (e.message) {
      case ERR_INVALID_PASSWORD:
        throw boom.notFound('E-mail ou senha inválido');
      case ERR_INVALID_TOKEN:
        throw boom.badImplementation('Erro ao gerar token');
      case ERR_USER_NOT_FOUND:
        throw boom.notFound('E-mail ou senha inválido');
      default:
        throw boom.badImplementation(e);
    }
  }
};

module.exports = {
  login,
};
