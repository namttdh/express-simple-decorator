import {ParamsType} from "../constants/ParamsType";
import {setParamMetadata} from "./paramsHelper";

const Param = (value) => {
    return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
        setParamMetadata(ParamsType.PARAM, target, propertyKey, parameterIndex, value);
    };
};

export default Param;