const boom = require('@hapi/boom');
const authenticate = require('../auth/authenticate.auth');

const {
  ERR_USER_NOT_FOUND,
  ERR_INVALID_PASSWORD,
} = require('../utils/errorTypes')

const login = async (req, h) => {
  const { email, password } = req.payload;

  try {
    const logged = await authenticate.login(email, password);
  
    return h.response(logged).code(200);
  } catch (e) {
    switch (e.message) {
      case ERR_USER_NOT_FOUND:
        throw boom.notFound('Usuário não encontrado');
      case ERR_INVALID_PASSWORD:
        throw boom.badData('E-mail ou senha inválido')
      default:
        throw boom.badImplementation(e);
    }
  }
};

module.exports = {
  login,
};
