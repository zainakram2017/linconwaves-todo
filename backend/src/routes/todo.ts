import { Router } from 'express';

import { UserRoleEnum, type Route } from '../utils/types/index';
import { createTodo, readTodo, updateTodo, deleteTodo, getAllTodos } from '../controllers/todo';
import { isAuthenticated, isAuthorized } from '../middlewares';

const router = Router();

const todoRoute: Route[] = [
    {
        method: 'post',
        route: '/',
        middlewares: [isAuthenticated, isAuthorized([UserRoleEnum.ADMIN])],
        controller: createTodo,
    },
    {
        method: 'get',
        route: '/:id',
        middlewares: [isAuthenticated, isAuthorized([UserRoleEnum.ADMIN])],
        controller: readTodo,
    },
    {
        method: 'put',
        route: '/:id',
        middlewares: [isAuthenticated],
        controller: updateTodo,
    },
    {
        method: 'delete',
        route: '/:id',
        middlewares: [isAuthenticated, isAuthorized([UserRoleEnum.ADMIN])],
        controller: deleteTodo,
    },
    {
        method: 'get',
        route: '/',
        middlewares: [isAuthenticated, isAuthorized([UserRoleEnum.ADMIN])],
        controller: getAllTodos,
    }
    
];

todoRoute.forEach(route => {
    router[route.method](route.route, route.middlewares, route.controller);
});

export { router as todoRoutes };

