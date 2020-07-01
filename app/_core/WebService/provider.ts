import {container} from "tsyringe";
import {IWebServiceName} from "./constract/IWebService";
import {ExpressWebService} from "./ExpressWebService";
import {IRouterFactoryName} from "./constract/IRouteFactory";
import {ExpressRouteFactory} from "./ExpressRouteFactory";

container.register(IWebServiceName, {
    useClass: ExpressWebService,
});

container.register(IRouterFactoryName, {
    useClass: ExpressRouteFactory,
});

container.register('controllers', {
    useValue: [],
});