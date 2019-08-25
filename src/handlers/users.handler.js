const boom = require('@hapi/boom');
const hash = require('../utils/hash');

const userRepository = require('../repositories/users.repository');
const { ERR_DUPLICATED_EMAIL } = require('../utils/errorTypes');

const create = async (req, h) => {
  try {
    const userData = req.payload;

    const passwordHash = await hash.make(userData.password, 10);

    userData.password = passwordHash;

    const user = await userRepository.create(userData)
    return h.response(user).code(201);
  } catch (e) {
    switch (e.message) {
      case ERR_DUPLICATED_EMAIL:
        throw boom.badData('E-mail duplicado');
      default:
        throw boom.badImplementation(e);
    }
  }
};

module.exports = {
  create,
};
