import { Router } from 'express';

import { authRoutes } from './auth';
import { userRoutes } from './user';
import { todoRoutes } from './todo';

const appRouter = Router();

appRouter.use('/auth', authRoutes);
appRouter.use('/user', userRoutes);
appRouter.use('/todo', todoRoutes);

export { appRouter };
