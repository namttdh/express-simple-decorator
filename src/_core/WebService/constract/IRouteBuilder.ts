import {HttpMethod} from "../constants/HttpMethod";
import {IParamDefinition} from "./IParamDefinition";
import {IMiddlewareDefinition} from "./IMiddlewareDefinition";

export interface IRouteBuilder {
    addMiddleware(middleware: IMiddlewareDefinition);

    setMiddleware(middleware: IMiddlewareDefinition[]);

    getMiddleware();

    setMethod(method: HttpMethod);

    getMethod(): HttpMethod;

    setPath(path: string);

    getPath(): string;

    addParam(param: IParamDefinition);

    setParams(params: IParamDefinition[]);

    getParams(): IParamDefinition[];

    setFunctionMethod(method);

    getFunctionMethod();

    setResponseCode(code);

    getResponseCode();
}
