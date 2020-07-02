import {ParamsType} from "./constants/ParamsType";
import {BodyParamsResolve} from "./paramsResolve/BodyParamsResolve";
import {ParamResolve} from "./paramsResolve/ParamResolve";

export const paramsResolveWorker = () => {
    const resolver: Map<ParamsType, any> = new Map();
    resolver.set(ParamsType.BODY, BodyParamsResolve);
    resolver.set(ParamsType.PARAM, ParamResolve);

    return resolver;
};