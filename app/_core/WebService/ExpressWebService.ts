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
import {ExpressRouteFactory} from "./ExpressRouteFactory";
import {IMiddlewareDefinition} from "./constract/IMiddlewareDefinition";
import {MIDDLEWARE_DECORATOR_KEY} from "./decorators/Middleware";

@singleton()
export class ExpressWebService implements IWebService{
    private readonly expressApplication: Application;
    private readonly listController: Array<any>

    constructor(@inject('controllers') listController: Array<IController>) {
        this.listController = listController;
        this.expressApplication = express();

        this.registerController();
    }

    run() {
        this.expressApplication.listen(process.env.APPLICATION_PORT,  () => {
            console.log('\x1b[32m%s\x1b[0m', 'Application running');
        });
    }

    instance() {
        return this.expressApplication;
    }

    registerController() {
        if (this.listController.length === 0) {
            console.log('\x1b[31m%s\x1b[0m', 'You\' not register any controller');
            process.exit();
        }

        let expressRouteFactory = new ExpressRouteFactory(this);

        this.listController.forEach(controller => {
            const prefix = Reflect.getMetadata(CONTROLLER_DECORATOR_KEY, controller);
            const routes = Reflect.getMetadata(ROUTES_DECORATOR_KEY, controller) as Array<IRouteDefinition>;
            const methods = Reflect.getMetadata(PARAMS_DECORATOR_KEY, controller) as Map<string, Array<IParamDefinition>>;
            const listMiddleware = Reflect.getMetadata(MIDDLEWARE_DECORATOR_KEY, controller) as IMiddlewareDefinition[];
            const localMiddleware: Map<string, IMiddlewareDefinition> = new Map();

            if (listMiddleware) {
                listMiddleware.forEach(middleware => {
                    if (middleware.methodName) {
                        localMiddleware.set(middleware.methodName, middleware);
                    } else {
                        let middlewareInstance = container.resolve(middleware.middleware as any);
                        this.expressApplication.use(prefix, middlewareInstance['apply']);
                    }
                });
            }

            const expressRouteBuilders: Array<IRouteBuilder> = [];
            if (routes) {
                routes.forEach(route => {
                    let routeBuilder = new ExpressRouteBuilder();
                    routeBuilder
                        .setMethod(route.requestMethod)
                        .setPath(prefix + route.path)
                        .setFunctionMethod(route.methodName)
                        .setMiddleware(localMiddleware.get(route.methodName) as any);

                    if (methods) {
                        let params = methods.get(route.methodName);
                        if (params) {
                            routeBuilder.setParams(params);
                        }
                    }

                    expressRouteBuilders.push(routeBuilder);
                })
            }

            expressRouteFactory.build(controller, expressRouteBuilders)
        });
    }
}
