import UserModel from '../models/users.model';
import { set, del } from './cache.repository';
import { ERR_DUPLICATE_EMAIL } from '../utils/errorTypes';
import { LOGIN_EXPIRATION_TIME } from '../auth/confs';

const PREFIX_CACHE = 'userId:';

const create = async (userData) => {
  const userExists = await UserModel.exists({ email: userData.email });

  if (userExists) {
    throw new Error(ERR_DUPLICATE_EMAIL);
  }

  const userModel = new UserModel(userData);
  return userModel.save();
};

const findAll = () => UserModel.find({});

const findByEmail = (email) => (
  UserModel.findOne({ email })
);

const setCache = (user) => (
  set(`${PREFIX_CACHE}${user.id}`, JSON.stringify(user), LOGIN_EXPIRATION_TIME)
);

const removeCache = (userId) => (
  del(`${PREFIX_CACHE}${userId}`)
);

export default {
  create,
  findAll,
  findByEmail,
  setCache,
  removeCache,
};
