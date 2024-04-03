import { Router } from 'express';

import { type Route } from '../utils/types';
import { signUp, login } from '../controllers/auth';

const router = Router();

const authRoute: Route[] = [
    {
        method: 'post',
        route: '/signup',
        middlewares: [],
        controller: signUp
    },
    {
        method: 'post',
        route: '/login',
        middlewares: [],
        controller: login
    },
];

authRoute.forEach(route => {
    router[route.method](route.route, route.middlewares, route.controller);
});

export { router as authRoutes };
