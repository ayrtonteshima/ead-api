const userRoutes = require('./users.route');
const authRoutes = require('./auth.route');

module.exports = [
  ...userRoutes,
  ...authRoutes,
];
