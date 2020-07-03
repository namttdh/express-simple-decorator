import {ParamsType} from "../constants/ParamsType";
import {setParamMetadata} from "./paramsHelper";

const Request = (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    setParamMetadata(ParamsType.REQUEST, target, propertyKey, parameterIndex);
};

export default Request;