const JWT = require('jsonwebtoken');

const { ERR_INVALID_TOKEN } = require('../utils/errorTypes');
const { ALGORITHM } = require('./confs');

const generate = data => (
  new Promise((resolve) => {
    JWT.sign(data, process.env.SECRET_KEY, { algorithm: ALGORITHM }, (err, token) => {
      if (err) {
        console.error(err);
        throw new Error(ERR_INVALID_TOKEN);
      }

      resolve(token);
    });
  })
);

module.exports = {
  generate,
};
