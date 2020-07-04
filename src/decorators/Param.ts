import {ParamsType} from "../constants/ParamsType";
import {setParamMetadata} from "./paramsHelper";

const Param = (...args): any => {
    if (args.length == 1) {
        return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
            setParamMetadata(ParamsType.PARAM, target, propertyKey, parameterIndex, args[0]);
        };
    } else {
        setParamMetadata(ParamsType.PARAM, args[0], args[1], args[2], null);
    }
};

export default Param;