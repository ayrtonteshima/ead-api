import boom from '@hapi/boom';
import userRepository from '../repositories/users.repository';
import hash from '../utils/hash';
import { ERR_DUPLICATE_EMAIL } from '../utils/errorTypes';

const create = async (req, h) => {
  try {
    const userData = req.payload;
    const passwordHashed = await hash.make(userData.password);

    userData.password = passwordHashed;

    const user = await userRepository.create(userData);
    return h.response(user).code(201);
  } catch (e) {
    switch (e.message) {
      case ERR_DUPLICATE_EMAIL:
        throw boom.badData('E-mail duplicado');
      default:
        throw boom.badImplementation(e);
    }
  }
};

const getAll = async () => [];

export default {
  create,
  getAll,
};
