import {IRouteDefinition} from "../constract/IRouteDefinition";
import {HttpMethod} from "../constants/HttpMethod";

export const ROUTES_DECORATOR_KEY = Symbol('list_routes');

export const Route = ({path, method = HttpMethod.GET}): MethodDecorator => {
    path = path[0] === '/' ? path : '/' + path;

    return (target, propertyKey: string, descriptor): void => {
        const routes = Reflect.getMetadata(ROUTES_DECORATOR_KEY, target.constructor) as Array<IRouteDefinition> ?? [];

        routes.push({
            requestMethod: method,
            path,
            methodName: propertyKey
        });
        Reflect.defineMetadata(ROUTES_DECORATOR_KEY, routes, target.constructor);
    };
};
