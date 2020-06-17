import JWT from 'jsonwebtoken';

import { ERR_INVALID_TOKEN } from '../utils/errorTypes';
import { ALGORITHM } from './confs';

const generate = (data) => (
  new Promise((resolve) => {
    JWT.sign(data, process.env.SECRET_KEY, { algorithm: ALGORITHM }, (err, token) => {
      if (err) {
        console.error(err);
        throw new Error(ERR_INVALID_TOKEN);
      }

      resolve(token);
    });
  })
);

export default { generate };
