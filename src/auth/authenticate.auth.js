const { findByEmail } = require('../repositories/users.repository');
const hash = require('../utils/hash');
const Token = require('./token.auth');
const { LOGIN_EXPIRATION_TIME } = require('./confs');

const {
  ERR_USER_NOT_FOUND,
  ERR_INVALID_PASSWORD,
} = require('../utils/errorTypes')

const login = async (email, password) => {
  const user = await findByEmail(email);

  if (!user) {
    throw new Error(ERR_USER_NOT_FOUND);
  }

  const passwordOk = await hash.compare(password, user.password);

  if (!passwordOk) {
    throw new Error(ERR_INVALID_PASSWORD);
  }

  const JWTData = {
    iss: 'ead-api',
    sub: user.id,
    exp: Math.floor(Date.now() / 1000) + LOGIN_EXPIRATION_TIME
  };

  const token = await Token.generate(JWTData);

  return token;
};

module.exports = {
  login,
};
