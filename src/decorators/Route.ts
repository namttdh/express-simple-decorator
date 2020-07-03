import {IRouteDefinition} from "../constract/IRouteDefinition";
import {OK} from "http-status-codes";
import {HttpMethod} from "../constants";

export const ROUTES_DECORATOR_KEY = Symbol('list_routes');

const Route = ({path, method = HttpMethod.GET, responseCode = OK}): MethodDecorator => {
    path = path[0] === '/' ? path : '/' + path;

    return (target, propertyKey: string, descriptor): void => {
        const routes = Reflect.getMetadata(ROUTES_DECORATOR_KEY, target.constructor) as Array<IRouteDefinition> ?? [];

        routes.push({
            requestMethod: method,
            path,
            methodName: propertyKey,
            responseCode
        });
        Reflect.defineMetadata(ROUTES_DECORATOR_KEY, routes, target.constructor);
    };
};

export default Route;