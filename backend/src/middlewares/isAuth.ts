import { Response, NextFunction } from 'express';

import User from '../models/User';
import { HttpException } from '../utils/exceptions/http';
import { RequestObject } from '../utils/types';
import { verifyToken } from '../utils/helperFunctions';


export const isAuthenticated = async (
    req: RequestObject,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers['x-access-token'] as string;
    if (!token) {
        next(new HttpException(401, 'Token Missing!', []));
    }

    try {
        const userData = verifyToken(token);
        if (!userData) {
            next(new HttpException(401,'Invalid Token! Please Login Again',[]));
        }

        const user = await User.findOne({ email: userData.email });
        if (!user) {
            next(new HttpException(401,'Not Authenticated Please Contact Admin For Permission',[]));
            return;
        }

        const { _id, role, email } = user;
        req.currentUser = { ...userData, uuid: _id, role, email };
        next();
    } catch (error) {
        console.error(error);
        next(new HttpException(401, 'Not Authenticated', []));
    }
};
