const bcrypt = require('bcryptjs');

const defaultSaltRounds = 10;

const make = async (plaintextPassword) => (
  bcrypt.hash(plaintextPassword, defaultSaltRounds)
);

const compare = (value, valueHash) => (
  bcrypt.compare(value, valueHash)
);

module.exports = {
  make,
  compare,
};
