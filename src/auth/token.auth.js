import JWT from 'jsonwebtoken';

import { ERR_INVALID_TOKEN } from '../utils/errorTypes';
import { ALGORITHM } from './confs';

const { SECRET_KEY } = process.env;

const generate = (data) => {
  try {
    return JWT.sign(data, SECRET_KEY, { algorithm: ALGORITHM });
  } catch (error) {
    console.error(error.message);
    throw new Error(ERR_INVALID_TOKEN);
  }
};

export default { generate };
