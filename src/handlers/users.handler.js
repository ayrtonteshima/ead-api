import { badData, badImplementation } from '@hapi/boom';
import userRepository from '../repositories/users.repository';
import { make } from '../utils/hash';
import { ERR_DUPLICATE_EMAIL } from '../utils/errorTypes';

const create = async (req, h) => {
  try {
    const userData = req.payload;
    const passwordHashed = await make(userData.password);

    userData.password = passwordHashed;

    const user = await userRepository.create(userData);
    return h.response(user).code(201);
  } catch (e) {
    switch (e.message) {
      case ERR_DUPLICATE_EMAIL:
        throw badData('E-mail duplicado');
      default:
        throw badImplementation(e);
    }
  }
};

const getAll = async () => userRepository.findAll();

export default {
  create,
  getAll,
};
