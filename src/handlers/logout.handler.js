import boom from '@hapi/boom';
import auth from '../auth/authenticate.auth';
import userRepository from '../repositories/users.repository';

const logout = async (req, h) => {
  const { credentials, token } = req.auth;
  try {
    await Promise.all([
      auth.logout(token),
      userRepository.removeCache(credentials.data.user_id),
    ]);

    return h.response().code(200);
  } catch (e) {
    console.error(e);
    throw boom.badImplementation();
  }
};

export default {
  logout,
};
