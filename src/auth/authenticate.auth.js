import generate from './token.auth';
import { set } from '../repositories/cache.repository';
import userRepository from '../repositories/users.repository';
import { LOGIN_EXPIRATION_TIME, BLACKLIST_CACHE_PREFIX } from './confs';
import { compare } from '../utils/hash';
import { ERR_USER_NOT_FOUND, ERR_INVALID_PASSWORD } from '../utils/errorTypes';
import isEmpty from '../utils/object.helper';

const login = async (email, password) => {
  const user = await userRepository.findByEmail(email);

  if (isEmpty(user)) {
    throw new Error(ERR_USER_NOT_FOUND);
  }

  const passwordOk = await compare(password, user.password);

  if (isEmpty(passwordOk)) {
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

  const token = generate(JWTData);

  return { user, token };
};

const logout = (token) => (
  set(`${BLACKLIST_CACHE_PREFIX}${token}`, 1, LOGIN_EXPIRATION_TIME)
);

export default {
  login,
  logout,
};
