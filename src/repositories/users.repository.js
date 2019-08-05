const UserModel = require('../models/users.model');

const create = (userData) => {
  const userModel = new UserModel(userData);
  return userModel.save();
};

module.exports = {
  create,
};
