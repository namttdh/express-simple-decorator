import {HttpMethod} from './constants/HttpMethod';
import {IParamDefinition} from "./constract/IParamDefinition";
import {IRouteBuilder} from "./constract/IRouteBuilder";
import {IMiddlewareDefinition} from "./constract/IMiddlewareDefinition";

export class ExpressRouteBuilder implements IRouteBuilder {
    public middleware: Array<any> = [];
    public params: Array<IParamDefinition> = [];
    public method?: HttpMethod = HttpMethod.GET;
    public path: string;
    public functionMethod: string;

    addMiddleware(middleware: IMiddlewareDefinition): ExpressRouteBuilder {
        this.middleware.push(middleware);

        return this;
    }

    setMethod(method: HttpMethod): ExpressRouteBuilder {
        this.method = method;

        return this;
    }

    setPath(path: string): ExpressRouteBuilder {
        this.path = path;

        return this;
    }

    addParam(param: IParamDefinition) {
        this.params.push(param);

        return this;
    }

    setParams(params: IParamDefinition[]) {
        this.params = params;

        return this;
    }

    getMethod(): HttpMethod {
        return this.method;
    }

    getParams(): IParamDefinition[] {
        return this.params;
    }

    getPath(): string {
        return this.path;
    }

    setFunctionMethod(method) {
        this.functionMethod = method;

        return this;
    }

    getFunctionMethod() {
        return this.functionMethod;
    }

    getMiddleware() {
        return this.middleware;
    }

    setMiddleware(middleware: IMiddlewareDefinition[]) {
        this.middleware = middleware;

        return this;
    }
}
