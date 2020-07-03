import {IWebService} from "./constract/IWebService";
import {container, inject, singleton} from "tsyringe";
import express, {Application} from "express";
import {IController} from "./constract/IController";
import {CONTROLLER_DECORATOR_KEY} from "./decorators/Controller";
import {ROUTES_DECORATOR_KEY} from "./decorators/Route";
import {ExpressRouteBuilder} from "./ExpressRouteBuilder";
import {IRouteDefinition} from "./constract/IRouteDefinition";
import {IParamDefinition} from "./constract/IParamDefinition";
import {PARAMS_DECORATOR_KEY} from "./decorators/paramsHelper";
import {IRouteBuilder} from "./constract/IRouteBuilder";
import {ExpressRouteWorker} from "./ExpressRouteWorker";
import {IMiddlewareDefinition} from "./constract/IMiddlewareDefinition";
import {MIDDLEWARE_DECORATOR_KEY} from "./decorators/Middleware";

@singleton()
export class ExpressWebService implements IWebService{
    private readonly expressApplication: Application;
    private readonly listController: Array<any>;
    private readonly expressRouteFactory: ExpressRouteWorker;
    private readonly globalMiddleware: Array<any>;
    private readonly instanceMiddleware: Map<any, any> = new Map();

    constructor(@inject('controllers') listController: Array<IController>, @inject('globalMiddleware') globalMiddleware: Array<any>) {
        this.listController = listController;
        this.globalMiddleware = globalMiddleware ?? [];
        this.expressApplication = express();
        this.expressRouteFactory = new ExpressRouteWorker(this);
        this.registerController();
        this.registerGlobalMiddleware();
    }

    run() {
        this.expressApplication.listen(process.env.APPLICATION_PORT,  () => {
            console.log('\x1b[32m%s\x1b[0m', 'Application running');
        });
    }

    instance() {
        return this.expressApplication;
    }

    registerGlobalMiddleware() {
        this.globalMiddleware.forEach(middleware => {
            this.expressApplication.use(this.instanceMiddleware.get(middleware));
        })
    }

    registerController() {
        if (this.listController.length === 0) {
            console.log('\x1b[31m%s\x1b[0m', 'You\' not register any controller');
            process.exit();
        }

        this.listController.forEach(controller => {
            const prefix = Reflect.getMetadata(CONTROLLER_DECORATOR_KEY, controller);
            const routes = Reflect.getMetadata(ROUTES_DECORATOR_KEY, controller) as Array<IRouteDefinition>;
            const methods = Reflect.getMetadata(PARAMS_DECORATOR_KEY, controller) as Map<string, Array<IParamDefinition>>;
            const listMiddleware = Reflect.getMetadata(MIDDLEWARE_DECORATOR_KEY, controller) as IMiddlewareDefinition[];
            const listMiddleRouteMap = this.resolveLocalMiddleware(prefix, listMiddleware);
            this.resolveRoute(prefix, routes, listMiddleRouteMap, methods, controller);
        });
    }

    resolveSingletonMiddleware(listMiddleware?: IMiddlewareDefinition[]) {

        if (!listMiddleware) return new Map();

        listMiddleware.forEach(middleware => {
            if (typeof middleware.middleware === 'string' || Reflect.getMetadata(MIDDLEWARE_DECORATOR_KEY, middleware.middleware)) {
                if (!this.instanceMiddleware.get(middleware.middleware)) {
                    let middlewareInstance = container.resolve(middleware.middleware as any);
                    this.instanceMiddleware.set(middleware.middleware, middlewareInstance['apply']);
                }
            } else {
                this.instanceMiddleware.set(middleware.middleware, middleware.middleware);
            }
        });

        return this.instanceMiddleware;
    }

    resolveLocalMiddleware(prefix:string, listMiddleware?: IMiddlewareDefinition[]) {
        const listMiddleRouteMap = new Map();

        if (listMiddleware) {
            const listMiddlewareSingleton = this.resolveSingletonMiddleware(listMiddleware);
            listMiddleware.forEach(middlewareDefinition => {
                let middlewareInstance = listMiddlewareSingleton.get(middlewareDefinition.middleware);
                if (middlewareDefinition.methodName) {
                    let middlewareRoutes = listMiddleRouteMap.get(middlewareDefinition.methodName) ?? [];
                    middlewareRoutes.push(middlewareInstance);
                    listMiddleRouteMap.set(middlewareDefinition.methodName, middlewareRoutes);
                } else {
                    this.expressApplication.use(prefix, middlewareInstance);
                }
            });
        }

        return listMiddleRouteMap;
    }

    resolveRoute(prefix, routes: Array<IRouteDefinition>, listMiddleRouteMap, methods, controller) {
        const expressRouteBuilders: Array<IRouteBuilder> = [];
        if (routes) {
            routes.forEach(route => {
                let routeBuilder = new ExpressRouteBuilder();
                routeBuilder
                    .setMethod(route.requestMethod)
                    .setPath(prefix + route.path)
                    .setFunctionMethod(route.methodName)
                    .setMiddleware(listMiddleRouteMap.get(route.methodName))
                    .setResponseCode(route.responseCode);

                if (methods) {
                    let params = methods.get(route.methodName);
                    if (params) {
                        routeBuilder.setParams(params);
                    }
                }

                expressRouteBuilders.push(routeBuilder);
            })
        }

        this.expressRouteFactory.build(controller, expressRouteBuilders)
    }
}
