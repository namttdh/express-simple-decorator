import {IParamsResolve} from "../constract/IParamsResolve";
import {Request, Response} from "express";

export class ParamResolve implements IParamsResolve{
    async resolve(request: Request, response: Response, param) {
        return request.params[param];
    }
}
