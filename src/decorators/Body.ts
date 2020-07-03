import {ParamsType} from "../constants/ParamsType";
import {setParamMetadata} from "./paramsHelper";

const Body = (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    let types = Reflect.getMetadata("design:paramtypes", target, propertyKey);
    setParamMetadata(ParamsType.BODY, target, propertyKey, parameterIndex, types[parameterIndex]);
};

export default Body;