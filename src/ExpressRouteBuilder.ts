import {IParamDefinition} from "./constract/IParamDefinition";
import {IRouteBuilder} from "./constract/IRouteBuilder";
import {IMiddlewareDefinition} from "./constract/IMiddlewareDefinition";
import {OK} from "http-status-codes";
import {HttpMethod} from "./constants";

export class ExpressRouteBuilder implements IRouteBuilder {
    public middleware: Array<any> = [];
    public params: Array<IParamDefinition> = [];
    public method?: HttpMethod = HttpMethod.GET;
    public path: string;
    public functionMethod: string;
    public responseCode?: number = OK;

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
        return this.middleware ?? [];
    }

    setMiddleware(middleware: IMiddlewareDefinition[]) {
        this.middleware = middleware;

        return this;
    }

    getResponseCode() {
        return this.responseCode ?? OK;
    }

    setResponseCode(code) {
        this.responseCode = code;

        return this;
    }
}
