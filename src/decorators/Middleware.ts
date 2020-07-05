import {NextFunction, Request, Response} from "express";
import {IMiddlewareDefinition} from "../constract/IMiddlewareDefinition";
import {BaseMiddleware} from "../abstract";
import {singleton} from "tsyringe";

export const MIDDLEWARE_DECORATOR_KEY = Symbol('middleware_prefix');

const Middleware = (middleware?: any): any => {
    return (target: any, propertyKey: string) => {
        if (!middleware) {
            singleton()(target)
            Reflect.defineMetadata(MIDDLEWARE_DECORATOR_KEY, true, target);
        } else {
            let currentTarget = propertyKey ? target.constructor : target;
            let listMiddleware = Reflect.getMetadata(MIDDLEWARE_DECORATOR_KEY, currentTarget) as IMiddlewareDefinition[] ?? [];

            if(!Array.isArray(middleware)){
                middleware = [middleware];
            }

            middleware.forEach((middle: any) => {
                listMiddleware.unshift({
                    middleware: middle,
                    methodName: propertyKey ?? undefined
                });
            });

            Reflect.defineMetadata(MIDDLEWARE_DECORATOR_KEY, listMiddleware, currentTarget);
        }
    };
};

export type MiddlewareDecoratorProps = BaseMiddleware | string | ((request: Request, response: Response, next: NextFunction) => void);

export default Middleware;