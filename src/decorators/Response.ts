import {ParamsType} from "../constants/ParamsType";
import {setParamMetadata} from "./paramsHelper";

const Response = (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    setParamMetadata(ParamsType.RESPONSE, target, propertyKey, parameterIndex);
};

export default Response;