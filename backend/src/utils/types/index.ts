import { Request, Response, NextFunction } from 'express';

type Middleware = (req: Request, res: Response, next: NextFunction) => void;
type Controller = (req: Request, res: Response, next: NextFunction) => Promise<void>;
type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type Route = {
    method: HttpMethod;
    route: string;
    middlewares: Middleware[];
    controller: Controller;
};

export type DatabaseConfig = {
    DATABASE_URL: string;
}

export type Secret = {
    port: string;
    dbConfig: DatabaseConfig;
    jwtConfig: {
        JWT_SECRET: string;
        JWT_EXPIRY: string;
    },
    saltRounds: string;
}

export type RequestObject = Request & {
    currentUser?: {
        uuid: string;
        name: string;
        email: string;
        role:  string;
    };
}

export type TokenPayload = {
    uuid: string;
    name: string;
    email: string;
    role: string;
}

export enum UserRoleEnum {
    ADMIN = 'admin',
    USER = 'user',
}


export enum TodoPriorityLevelEnum {
    High = 'high',
    Medium = 'medium',
    Low = 'low',
}

export enum TodoStatusEnum {
    NotStarted = 'not_started',
    InProgress = 'in_progress',
    Completed = 'completed',
}