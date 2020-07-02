import {container} from "tsyringe";
import {IWebServiceName} from "./constract/IWebService";
import {ExpressWebService} from "./ExpressWebService";
import {IRouterFactoryName} from "./constract/IRouteFactory";
import {ExpressRouteWorker} from "./ExpressRouteWorker";

container.register(IWebServiceName, {
    useClass: ExpressWebService,
});

container.register(IRouterFactoryName, {
    useClass: ExpressRouteWorker,
});

container.register('controllers', {
    useValue: [],
});