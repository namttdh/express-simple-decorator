import {IParamDefinition} from "../constract/IParamDefinition";

export const PARAMS_DECORATOR_KEY = Symbol('list_params');

export const setParamMetadata = (paramsType, target, propertyKey, parameterIndex, objectTransfer?: any) => {
    const methods = Reflect.getMetadata(PARAMS_DECORATOR_KEY, target.constructor) as Map<string, Array<IParamDefinition>> ?? new Map();
    let params = methods.get(propertyKey) ?? [];
    params.push({
        index: parameterIndex,
        type: paramsType,
        methodName: propertyKey,
        objectTransfer
    });
    methods.set(propertyKey, params);
    Reflect.defineMetadata(PARAMS_DECORATOR_KEY, methods, target.constructor);
};
