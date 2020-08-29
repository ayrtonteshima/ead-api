const Token = require('./token.auth');
const Cache = require('../repositories/cache.repository');
const { findByEmail } = require('../repositories/users.repository');
const { SECONDS_FROM_1970_TO_NOW, LOGIN_EXPIRATION_TIME, BLACKLIST_CACHE_PREFIX } = require('./confs');

const hash = require('../utils/hash');

const {
  ERR_USER_NOT_FOUND,
  ERR_INVALID_PASSWORD,
} = require('../utils/errorTypes');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
const login = async (email, password) => {
  const user = await getUserByEmail(email);
  checkIfPasswordMatch(user, password);
  const JWTPayload = getJWTPayload(user);
  const token = await Token.generate(JWTPayload);
  return { user, token };
};

const getUserByEmail = async (email) => {
  const user = await findByEmail(email);
  if (!user) {
    throw new Error(ERR_USER_NOT_FOUND);
  }
  return user;
}

const checkIfPasswordMatch = async (user, password) => {
  const passwordMatch = await hash.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error(ERR_INVALID_PASSWORD);
  }
}

const getJWTPayload = (user) => {
  const payload = {
    iss: 'ead-api',
    sub: user.id,
    exp: SECONDS_FROM_1970_TO_NOW + LOGIN_EXPIRATION_TIME,   
    data: {
      user_id: user.id,
    },
  }
  return payload;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
const logout = token => (
  Cache.set(`${BLACKLIST_CACHE_PREFIX}${token}`, 1, LOGIN_EXPIRATION_TIME)
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
module.exports = {
  login,
  logout,
};
