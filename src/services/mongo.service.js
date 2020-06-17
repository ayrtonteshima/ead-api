import mongoose from 'mongoose';
import dotenv from 'dotenv-safe';

dotenv.config();

const HOST = process.env.MONGO_HOST;
const PORT = process.env.MONGO_PORT;
const DATABASE = process.env.MONGO_DATABASE;
const USER = process.env.MONGO_USER;
const PASSWORD = process.env.MONGO_PASSWORD;

const uri = `mongodb://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const get = async () => {
  try {
    mongoose.connect(uri, options);
    mongoose.connection.on('error', (err) => { throw new Error(err); });
  } catch (error) {
    console.error(error);
  }
};

export default { get };
