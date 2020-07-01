import {HttpMethod} from './constants/HttpMethod';
import {IParamDefinition} from "./constract/IParamDefinition";
import {IRouteBuilder} from "./constract/IRouteBuilder";

export class ExpressRouteBuilder implements IRouteBuilder {
    public middlewares: Array<any> = [];
    public params: Array<IParamDefinition> = [];
    public method?: HttpMethod = HttpMethod.GET;
    public path: string;
    public functionMethod: string;

    addMiddleware(middleware: void): ExpressRouteBuilder {
        this.middlewares.push(middleware);

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

    getMiddlewares() {
        return this.middlewares;
    }

    setFunctionMethod(method) {
        this.functionMethod = method;

        return this;
    }

    getFunctionMethod() {
        return this.functionMethod;
    }
}
