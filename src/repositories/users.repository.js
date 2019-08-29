const UserModel = require('../models/users.model');
const Cache = require('./cache.repository');
const { ERR_DUPLICATE_EMAIL } = require('../utils/errorTypes');
const { ERR_DUPLICATE_DOCNUMBER } = require('../utils/errorTypes');
const { LOGIN_EXPIRATION_TIME } = require('../auth/confs');

const PREFIX_CACHE = 'userId:';

const create = async (userData) => {
  const emailExists = await UserModel.exists({ email: userData.email });
  const docNumberExists = await UserModel.exists({ docNumber: userData.docNumber });

  if (emailExists) {
    throw new Error(ERR_DUPLICATE_EMAIL);
  }

  else if (docNumberExists) {
    throw new Error(ERR_DUPLICATE_DOCNUMBER);
  }

  const userModel = new UserModel(userData);
  return userModel.save();
};

const findByEmail = email => (
  UserModel.findOne({ email })
);

const setCache = user => (
  Cache.set(`${PREFIX_CACHE}${user.id}`, JSON.stringify(user), LOGIN_EXPIRATION_TIME)
);

const removeCache = userId => (
  Cache.del(`${PREFIX_CACHE}${userId}`)
);

module.exports = {
  create,
  findByEmail,
  setCache,
  removeCache,
};
