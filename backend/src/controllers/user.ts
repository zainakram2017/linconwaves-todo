import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

import { 
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
    readUserHandler,
    getAllUsersHandler
} from '../services/user';
import { UserRoleEnum } from '../utils/types';
import { validateRequest } from '../utils/validators';
import { HttpException } from '../utils/exceptions/http';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest(req.body, {
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        role: yup.string().required(),
    });

    if (isValid) {
        createUserHandler(req, res, next);

    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};

export const readUser = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest(req.params, {
        id: yup.string().required(),
    });

    if (isValid) {
        readUserHandler(req, res, next);

    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest({
        ...req.params,
        ...req.body
    }, {
        id: yup.string().required(),
        name: yup.string().required(),
        email: yup.string().email().required(),
        role: yup.string().required().oneOf(Object.values(UserRoleEnum))
    });

    if (isValid) {
        updateUserHandler(req, res, next);

    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest(req.params, {
        id: yup.string().required(),
    });

    if (isValid) {
        deleteUserHandler(req, res, next);

    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    getAllUsersHandler(req, res, next);
};