export const CONTROLLER_DECORATOR_KEY = Symbol('controller_prefix');

export const Controller = (prefix: string = ''): ClassDecorator => {
    prefix = prefix[0] === '/' ? prefix : '/' + prefix;

    return (target: any) => {
        Reflect.defineMetadata(CONTROLLER_DECORATOR_KEY, prefix, target);
    };
};
