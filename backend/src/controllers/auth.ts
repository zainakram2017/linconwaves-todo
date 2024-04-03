import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

import { signUpHandler, loginHandler } from '../services/auth';
import { validateRequest } from '../utils/validators';
import { HttpException } from '../utils/exceptions/http';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest(req.body, {
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
    });

    if (isValid) {
        signUpHandler(req, res, next);

    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { isValid, error } = await validateRequest(req.body, {
        email: yup.string().email().required(),
        password: yup.string().required(),
    });

    if(isValid) {
        loginHandler(req, res, next);
    } else {
        next(new HttpException(error.status, error.message, error.data));
    }
};
