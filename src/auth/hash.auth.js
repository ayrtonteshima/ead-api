const bcrypt = require('bcryptjs');

const make = async (value) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(value, salt);
};

const compare = (value, valueHash) => (
  bcrypt.compare(value, valueHash)
);

module.exports = {
  make,
  compare,
};
