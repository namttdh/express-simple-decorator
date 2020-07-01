import {ParamsType} from "../constants/ParamsType";
import {setParamMetadata} from "./paramsHelper";

export const Request = (target: any, propertyKey: string | symbol, parameterIndex: number,) => {
    setParamMetadata(ParamsType.REQUEST, target, propertyKey, parameterIndex);
};
