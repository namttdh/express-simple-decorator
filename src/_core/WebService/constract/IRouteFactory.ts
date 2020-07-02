import {IRouteBuilder} from "./IRouteBuilder";
import {IController} from "./IController";

export const IRouterFactoryName = 'IRouterFactory';

export interface IRouteFactory {
    build(controller: IController, builder: Array<IRouteBuilder>)
}
