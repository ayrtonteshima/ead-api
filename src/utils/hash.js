import bcrypt from 'bcryptjs';

export const make = async (value) => (
  bcrypt.hash(value, 10)
);

export const compare = (value, valueHash) => (
  bcrypt.compare(value, valueHash)
);

export default { make, compare };
