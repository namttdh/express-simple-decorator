import {NextFunction, Request, Response} from "express";

export const IMiddlewareName = 'IMiddlewareName'

export abstract class IMiddleware {
    abstract apply(request: Request, response: Response, next: NextFunction);
}