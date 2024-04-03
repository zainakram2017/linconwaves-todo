import { Router } from 'express';

import { UserRoleEnum, type Route } from '../utils/types/index';
import { createUser, readUser, updateUser, deleteUser, getAllUsers } from '../controllers/user';
import { isAuthenticated, isAuthorized } from '../middlewares';

const router = Router();

const userRoute: Route[] = [
    {
        method: 'post',
        route: '/',
        middlewares: [isAuthenticated, isAuthorized([UserRoleEnum.ADMIN])],
        controller: createUser,
    },
    {
        method: 'get',
        route: '/:id',
        middlewares: [isAuthenticated, isAuthorized([UserRoleEnum.ADMIN])],
        controller: readUser,
    },
    {
        method: 'put',
        route: '/:id',
        middlewares: [isAuthenticated],
        controller: updateUser,
    },
    {
        method: 'delete',
        route: '/:id',
        middlewares: [isAuthenticated, isAuthorized([UserRoleEnum.ADMIN])],
        controller: deleteUser,
    },
    {
        method: 'get',
        route: '/',
        middlewares: [isAuthenticated, isAuthorized([UserRoleEnum.ADMIN])],
        controller: getAllUsers,
    }
    
];

userRoute.forEach(route => {
    router[route.method](route.route, route.middlewares, route.controller);
});

export { router as userRoutes };

