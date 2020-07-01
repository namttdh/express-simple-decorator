import {HttpMethod} from "../constants/HttpMethod";
import {IParamDefinition} from "./IParamDefinition";

export interface IRouteBuilder {
    addMiddleware(middleware: void);

    setMethod(method: HttpMethod);

    getMethod(): HttpMethod;

    setPath(path: string);

    getPath(): string;

    addParam(param: IParamDefinition);

    setParams(params: IParamDefinition[]);

    getParams(): IParamDefinition[];

    getMiddlewares();

    setFunctionMethod(method);

    getFunctionMethod();
}
