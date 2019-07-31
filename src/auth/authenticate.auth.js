const Token = require('./token.auth');
const Cache = require('../repositories/cache.repository');
const { findByEmail } = require('../repositories/users.repository');
const { LOGIN_EXPIRATION_TIME, BLACKLIST_CACHE_PREFIX } = require('./confs');

const hash = require('./hash.auth');
const {
  ERR_USER_NOT_FOUND,
  ERR_INVALID_PASSWORD,
} = require('../utils/errorTypes');

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
    exp: Math.floor(Date.now() / 1000) + LOGIN_EXPIRATION_TIME,
    sub: user.id,
    iss: 'ead-api',
    data: {
      user_id: user.id,
    },
  };

  const token = await Token.generate(JWTData);

  return { user, token };
};

const logout = token => (
  Cache.set(`${BLACKLIST_CACHE_PREFIX}${token}`, 1, LOGIN_EXPIRATION_TIME)
);

module.exports = {
  login,
  logout,
};
