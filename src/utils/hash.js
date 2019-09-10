const bcrypt = require('bcryptjs');

const make = async (value) => (
  bcrypt.hash(value, 10)
);

const compare = (value, valueHash) => (
  bcrypt.compare(value, valueHash)
);

module.exports = {
  make,
  compare,
};
