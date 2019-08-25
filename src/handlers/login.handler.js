const boom = require('@hapi/boom');
const { findByEmail } = require('../repositories/users.repository')
const hash = require('../utils/hash');

const login = async (req, h) => {
  const user = await findByEmail(req.payload.email);

  if (!user) {
    throw boom.notFound('Usuário não existe!');
  }

  const passwordOk = await hash.compare(req.payload.password, user.password);

  if (!passwordOk) {
    throw boom.badData('E-mail ou senha inválidos!');
  }

  return 'Usuário logado!';
};

module.exports = {
  login,
};
