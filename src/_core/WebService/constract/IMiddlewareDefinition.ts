import {MiddlewareDecoratorProps} from "../decorators/Middleware";

export interface IMiddlewareDefinition {
    middleware: MiddlewareDecoratorProps;
    methodName?: string;
}
