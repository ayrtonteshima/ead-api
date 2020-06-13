import { exists } from '../../repositories/cache.repository';
import { BLACKLIST_CACHE_PREFIX, ALGORITHM } from '../confs';

const name = 'jwt';

const schema = 'jwt';

const options = {
  key: process.env.SECRET_KEY,
  validate: async (decoded, h) => {
    const unlogged = await exists(`${BLACKLIST_CACHE_PREFIX}${h.auth.token}`);
    return { isValid: !unlogged };
  },
  verifyOptions: { algorithms: [ALGORITHM] },
};

export default {
  name,
  schema,
  options,
};
