import userRoutes from './users.route';
import authRoutes from './auth.route';

export default [
  ...userRoutes,
  ...authRoutes,
];
