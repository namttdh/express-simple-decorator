import {ParamsType} from "../constants/ParamsType";
import {setParamMetadata} from "./paramsHelper";

export const Param = (value) => {
    return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
        setParamMetadata(ParamsType.PARAM, target, propertyKey, parameterIndex, value);
    };
}
