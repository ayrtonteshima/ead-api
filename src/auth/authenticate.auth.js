import Token from './token.auth';
import Cache from '../repositories/cache.repository';
import { findByEmail } from '../repositories/users.repository';
import { LOGIN_EXPIRATION_TIME, BLACKLIST_CACHE_PREFIX } from './confs';

import hash from '../utils/hash';

import {
  ERR_USER_NOT_FOUND,
  ERR_INVALID_PASSWORD,
} from '../utils/errorTypes';

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

const logout = (token) => (
  Cache.set(`${BLACKLIST_CACHE_PREFIX}${token}`, 1, LOGIN_EXPIRATION_TIME)
);

export default {
  login,
  logout,
};
