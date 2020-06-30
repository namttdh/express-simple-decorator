import {ROUTER_PREFIX_KEY} from "./Route";

export const CONTROLLER_PREFIX_KEY = 'prefix';

export const Controller = (prefix: string = ''): ClassDecorator => {
    prefix = prefix[0] === '/' ? prefix : '/' + prefix;

    return (target: any) => {
        Reflect.defineMetadata(CONTROLLER_PREFIX_KEY, prefix, target);

        // Since routes are set by our methods this should almost never be true (except the controller has no methods)
        if (! Reflect.hasMetadata(ROUTER_PREFIX_KEY, target)) {
            Reflect.defineMetadata(ROUTER_PREFIX_KEY, [], target);
        }
    };
};