import {IRouteFactory} from "./constract/IRouteFactory";
import {IRouteBuilder} from "./constract/IRouteBuilder";
import {IWebService, IWebServiceName} from "./constract/IWebService";
import express, {Application, Request, Response} from "express";
import {container, inject, singleton} from "tsyringe";
import {IController} from "./constract/IController";
import {ParamsType} from "./constants/ParamsType";
import {IParamDefinition} from "./constract/IParamDefinition";
import {paramsResolveWorker} from "./customParamsResolve";

@singleton()
export class ExpressRouteWorker implements IRouteFactory {
    private readonly expressApplication: Application;
    private readonly paramRegister: Map<ParamsType, any> = new Map();

    constructor(@inject(IWebServiceName) webService: IWebService) {
        this.expressApplication = webService.instance();
        this.expressApplication.use(express.urlencoded());
        this.paramRegister = paramsResolveWorker();
    }

    build(controller: IController, builder: Array<IRouteBuilder>) {
        let controllerInstance = container.resolve(controller as any);
        builder.forEach(route => {
            let paramsSort = route.getParams();
            this.expressApplication[route.getMethod()](route.getPath(), route.getMiddleware(), async(request: Request, response: Response) => {
                let params = [];
                for (const param of paramsSort) {
                    params[param.index] = await this.resolveRouteParams(param, request, response);
                }

                let result = await controllerInstance[route.getFunctionMethod()].apply(controllerInstance, params);
                if (!response.headersSent) {
                    response.status(route.getResponseCode()).send(result);
                }
            })
        });
    };

    async resolveRouteParams(paramDefinition: IParamDefinition, request: Request, response: Response) {
        switch (paramDefinition.type) {
            case ParamsType.REQUEST:
                return request;
            case ParamsType.RESPONSE:
                return response;
            default:
                let resolver = this.paramRegister.get(paramDefinition.type);
                if (resolver) {
                    return await new resolver().resolve(request, response, paramDefinition.objectTransfer);
                }

                return undefined;
        }
    }
}
