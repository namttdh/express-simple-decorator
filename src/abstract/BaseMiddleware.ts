import {NextFunction, Request, Response} from "express";

abstract class BaseMiddleware {
    abstract apply(request: Request, response: Response, next: NextFunction);
}

export default BaseMiddleware;