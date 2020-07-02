import {ExpressProvide} from "../_core/WebService/ExpressProvider";
import {ControllerProvider} from "../provider/controller.provider";

export const appConfig = {
    'provider': [
        ExpressProvide,
        ControllerProvider,
    ]
};