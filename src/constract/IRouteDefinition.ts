import {HttpMethod} from "../constants";

export interface IRouteDefinition {
    requestMethod: HttpMethod;
    path: string;
    methodName : string;
    responseCode
}