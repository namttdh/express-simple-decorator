import {HttpMethod} from "../constants/HttpMethod";

export interface IRouteDefinition {
    requestMethod: HttpMethod;
    path: string;
    methodName : string;
}