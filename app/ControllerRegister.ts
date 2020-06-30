import {inject, singleton} from "tsyringe";
import {Application, Request, Response} from "express";
import UserController from "./Controller/UserController";

@singleton()
export default class ControllerRegister {
    constructor(@inject("WebService") private webService: Application) {
        this.makeRoute();
    }

    register() {
        return [
            UserController,
        ]
    }

    makeRoute() {
        this.register().forEach(controller => {
            const instance = new controller();
            const prefix = Reflect.getMetadata('prefix', controller);
            const routes: Array<IRouteDefinition> = Reflect.getMetadata('routes', controller);

            routes.forEach(route => {
                this.webService[route.requestMethod](prefix + route.path, (req: Request, res: Response) => {
                    instance[route.methodName](req, res);
                });
            });
        });
    }
}