import {IRouteFactory} from "./constract/IRouteFactory";
import {IRouteBuilder} from "./constract/IRouteBuilder";
import {IWebService, IWebServiceName} from "./constract/IWebService";
import {Application, Request, Response} from "express";
import {container, inject, singleton} from "tsyringe";
import {IController} from "./constract/IController";
import {ParamsType} from "./constants/ParamsType";

@singleton()
export class ExpressRouteFactory implements IRouteFactory {
    private expressApplication: Application;

    constructor(@inject(IWebServiceName) webService: IWebService) {
        this.expressApplication = webService.instance();
    }

    build(controller: IController, builder: Array<IRouteBuilder>) {
        let controllerInstance = container.resolve(controller as any);
        builder.forEach(route => {
            let paramsSort = route.getParams().sort((a,b) => a.index - b.index);
            this.expressApplication[route.getMethod()](route.getPath(), (request: Request, response: Response) => {
                let params = [];
                paramsSort.forEach(param => {
                    switch (param.type) {
                        case ParamsType.REQUEST:
                            params.push(request);
                            break;
                        case ParamsType.RESPONSE:
                            params.push(response);
                            break;
                    }
                })
                let result = controllerInstance[route.getFunctionMethod()].apply(controllerInstance, params);
                if (!response.headersSent) {
                    response.send(result);
                }
            })
        });
    }
}
