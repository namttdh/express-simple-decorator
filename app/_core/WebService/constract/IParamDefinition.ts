import {ParamsType} from "../constants/ParamsType";

export interface IParamDefinition {
    index: number;
    type: ParamsType;
    methodName : string;
    objectTransfer?: any;
}