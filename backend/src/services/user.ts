import bcrypt from 'bcrypt';
import { Response, NextFunction } from 'express';

import User from '../models/User';
import { HttpException } from '../utils/exceptions/http';
import { RequestObject } from '../utils/types';

export const createUserHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            next(new HttpException(409, 'User already exists', []));
        }

        const user = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const readUserHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            next(new HttpException(404, 'User not found', []));
        } else {
            res.status(200).json({
                uuid: user._id,
                name: user.name,
                email: user.email
            });
        }
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const updateUserHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id);
        if (!user) {
            next(new HttpException(404, 'User not found', []));
        } else {
            user.set({
                name: req.body.name,
                email: req.body.email
            });
            await user.save();
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email
            });
        }
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const deleteUserHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            next(new HttpException(404, 'User not found', []));
        } else {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email
            });
        }
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const getAllUsersHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        const modifiedUsers = users.map(user => {
            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            };
        });
        res.status(200).json(modifiedUsers);                
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};
