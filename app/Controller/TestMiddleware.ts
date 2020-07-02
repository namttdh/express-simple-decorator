import {IMiddleware} from "../_core/WebService/constract/IMiddleware";
import {NextFunction, Request, Response} from "express";

export class TestMiddleware implements IMiddleware{
    apply(request: Request, response: Response, next: NextFunction) {
        next();
    }
}