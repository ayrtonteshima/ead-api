import JWT from 'jsonwebtoken';
import { ERR_INVALID_TOKEN } from '../utils/errorTypes';
import { ALGORITHM } from './confs';

// De acordo com essa dicussão (https://github.com/auth0/node-jsonwebtoken/issues/111),
// os métodos do jwt trabalham com operacões syncronas então no meu entendimento a melhor opção
// provavelmente seria nos livrar-mos das callbacks e tratar com try/catch.

const generate = (data) => {
  try {
    return JWT.sign(data, process.env.SECRET_KEY, { algorithm: ALGORITHM });
  } catch (error) {
    console.error(error.message);
    throw new Error(ERR_INVALID_TOKEN);
  }
};

export default generate;
