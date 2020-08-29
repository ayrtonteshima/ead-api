const boom = require('@hapi/boom');
const userRepository = require('../repositories/users.repository');
const hash = require('../utils/hash');
const { ERR_DUPLICATE_EMAIL } = require('../utils/errorTypes');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
const create = async (req, h) => {
  try {
    const userData = req.payload;
    userData.password = await hash.make(userData.password);
    const userCreated = await userRepository.create(userData);
    return h.response(userCreated).code(201);
  } catch (exception) {
    throwsCreateUserException(exception);
  }
};

const throwsCreateUserException = (exception) => {
  switch (exception.message) {
    case ERR_DUPLICATE_EMAIL:
      throw boom.badData('Duplicate email.');
    default:
      throw boom.badImplementation(exception);
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
const getAll = async () => [];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
module.exports = {
  create,
  getAll,
};
