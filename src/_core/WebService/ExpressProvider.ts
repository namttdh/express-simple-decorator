import {ServiceProvider} from "./abstract/ServiceProvider";
import {IWebServiceName} from "./constract/IWebService";
import {ExpressWebService} from "./ExpressWebService";
import {IRouterFactoryName} from "./constract/IRouteFactory";
import {ExpressRouteWorker} from "./ExpressRouteWorker";
import {inject, singleton} from "tsyringe";

@singleton()
export class ExpressProvide extends ServiceProvider {
    protected container;

    constructor(@inject('container') container) {
        super();
        this.container = container;
    }

    register() {
        this.container.register(IWebServiceName, {
            useClass: ExpressWebService,
        });

        this.container.register(IRouterFactoryName, {
            useClass: ExpressRouteWorker,
        });

        this.container.register('controllers', {
            useValue: [],
        });
    }
}