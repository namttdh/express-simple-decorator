import {IRouteFactory} from "./constract/IRouteFactory";
import {IRouteBuilder} from "./constract/IRouteBuilder";
import {IWebService, IWebServiceName} from "./constract/IWebService";
import express, {Application, Request, Response} from "express";
import {container, inject, singleton} from "tsyringe";
import {IController} from "./constract/IController";
import {ParamsType} from "./constants/ParamsType";
import {BodyParamsResolve} from "./paramsResolve/BodyParamsResolve";
import {IParamDefinition} from "./constract/IParamDefinition";
import {ParamResolve} from "./paramsResolve/ParamResolve";

@singleton()
export class ExpressRouteFactory implements IRouteFactory {
    private readonly expressApplication: Application;
    private readonly paramRegister: Map<ParamsType, any> = new Map();

    constructor(@inject(IWebServiceName) webService: IWebService) {
        this.expressApplication = webService.instance();
        this.expressApplication.use(express.urlencoded());
        this.register();
    }

    register()
    {
        this.paramRegister.set(ParamsType.BODY, BodyParamsResolve);
        this.paramRegister.set(ParamsType.PARAM, ParamResolve);
    }

    build(controller: IController, builder: Array<IRouteBuilder>) {
        let controllerInstance = container.resolve(controller as any);
        builder.forEach(route => {
            let paramsSort = route.getParams();
            this.expressApplication[route.getMethod()](route.getPath(), async(request: Request, response: Response) => {
                let params = [];
                for (const param of paramsSort) {
                    params[param.index] = await this.resolveRoute(param, request, response);
                }

                let result = controllerInstance[route.getFunctionMethod()].apply(controllerInstance, params);
                if (!response.headersSent) {
                    response.send(result);
                }
            })
        });
    };

    async resolveRoute(paramDefinition: IParamDefinition, request: Request, response: Response) {
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
