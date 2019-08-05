const userRepository = require('../repositories/users.repository');

const create = async (req, h) => {
  const user = await userRepository.create(req.payload)
  return h.response(user).code(201);
};

module.exports = {
  create,
};
