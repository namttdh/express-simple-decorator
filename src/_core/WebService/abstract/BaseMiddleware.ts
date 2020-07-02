import {NextFunction, Request, Response} from "express";

export abstract class BaseMiddleware {
    abstract apply(request: Request, response: Response, next: NextFunction);
}