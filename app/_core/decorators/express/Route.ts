import {GET} from "./constant/HttpMethod";

export const ROUTER_PREFIX_KEY = 'routes';

export const Route = ({path, method = GET}, ): MethodDecorator => {
    path = path[0] === '/' ? path : '/' + path;

    return (target, propertyKey: string, descriptor): void => {
        if (! Reflect.hasMetadata(ROUTER_PREFIX_KEY, target.constructor)) {
            Reflect.defineMetadata(ROUTER_PREFIX_KEY, [], target.constructor);
        }

        const routes = Reflect.getMetadata('routes', target.constructor) as Array<IRouteDefinition>;

        routes.push({
            requestMethod: method,
            path,
            methodName: propertyKey
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
};