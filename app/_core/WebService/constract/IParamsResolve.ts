import {Request, Response} from "express";

export const IParamsResolveName = 'IParamsResolve';

export interface IParamsResolve {
    resolve(request?: Request, response?: Response, other?: any)
}
