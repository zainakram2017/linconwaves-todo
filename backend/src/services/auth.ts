import bcrypt from 'bcrypt';
import { Response, NextFunction } from 'express';

import User from '../models/User';
import { HttpException } from '../utils/exceptions/http';
import { RequestObject } from '../utils/types';
import { generateToken } from '../utils/helperFunctions';
import { TokenPayload } from '../utils/types';

export const signUpHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: 'user',
        });

        await user.save();

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const loginHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const tokenPayload: TokenPayload = {
            uuid: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        const token = generateToken(tokenPayload);
        res.status(200).json({ 
            user: {
                uuid: user.id,
                name: user.name,
                email: user.email,
            },
            access_token: token,
        });
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

