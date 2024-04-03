import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

import { 
    createTodoHandler,
    updateTodoHandler,
    deleteTodoHandler,
    readTodoHandler,
    getAllTodosHandler
} from '../services/todo';
import { TodoStatusEnum, TodoPriorityLevelEnum } from '../utils/types/index';
import { validateRequest } from '../utils/validators';
import { HttpException } from '../utils/exceptions/http';

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest(req.body, {
        taskName: yup.string().required(),
        description: yup.string().required(),
        dueDate: yup.date().required(),
        priorityLevel: yup.string().required().oneOf(Object.values(TodoPriorityLevelEnum)),
        status: yup.string().required().oneOf(Object.values(TodoStatusEnum)),
    });

    if (isValid) {
        createTodoHandler(req, res, next);

    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};

export const readTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest(req.params, {
        id: yup.string().required(),
    });

    if (isValid) {
        readTodoHandler(req, res, next);

    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest({
        ...req.params,
        ...req.body
    }, {
        id: yup.string().required(),
        taskName: yup.string().required(),
        description: yup.string().required(),
        dueDate: yup.date().required(),
        priorityLevel: yup.string().required().oneOf(Object.values(TodoPriorityLevelEnum)),
        status: yup.string().required().oneOf(Object.values(TodoStatusEnum)),
    });

    if (isValid) {
        updateTodoHandler(req, res, next);

    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest(req.params, {
        id: yup.string().required(),
    });

    if (isValid) {
        deleteTodoHandler(req, res, next);

    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};

export const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    getAllTodosHandler(req, res, next);
};
