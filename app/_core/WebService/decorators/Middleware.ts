import {IMiddleware} from "../constract/IMiddleware";
import {NextFunction, Request, Response} from "express";
import {IMiddlewareDefinition} from "../constract/IMiddlewareDefinition";

export const MIDDLEWARE_DECORATOR_KEY = Symbol('middleware_prefix');

export const Middleware = (middleware: any): any => {
    return (target: any, propertyKey: string) => {
        let currentTarget = propertyKey ? target.constructor : target;
        let listMiddleware = Reflect.getMetadata(MIDDLEWARE_DECORATOR_KEY, currentTarget) as IMiddlewareDefinition[] ?? [];

        if(!Array.isArray(middleware)){
            middleware = [middleware];
        }

        middleware.forEach((middle: any) => {
            listMiddleware.push({
                middleware: middle,
                methodName: propertyKey ?? undefined
            });
        });

        Reflect.defineMetadata(MIDDLEWARE_DECORATOR_KEY, listMiddleware, currentTarget);
    };
};

export type MiddlewareDecoratorProps = IMiddleware | string | ((request: Request, response: Response, next: NextFunction) => void);