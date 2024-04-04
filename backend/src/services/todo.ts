import { Response, NextFunction } from 'express';

import Todo from '../models/Todo';
import { HttpException } from '../utils/exceptions/http';
import { RequestObject } from '../utils/types';

export const createTodoHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const todo = new Todo({
            ...req.body,
            user: req.currentUser?.uuid,
        });
        await todo.save();
        res.status(201).json(todo);
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const readTodoHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            next(new HttpException(404, 'Todo not found', []));
        }
        res.status(200).json(todo);
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const updateTodoHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                user: req.currentUser?.uuid,
            },
            { new: true }
        );
        if (!todo) {
            next(new HttpException(404, 'Todo not found', []));
        }
        res.status(200).json(todo);
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const deleteTodoHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            next(new HttpException(404, 'Todo not found', []));
        }
        res.status(200).json(todo);
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};

export const getAllTodosHandler = async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
        const todos = await Todo.find();        
        res.status(200).json(todos);
    } catch (error: any) {
        next(new HttpException(400, error?.message, error));
    }
};
