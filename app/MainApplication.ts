import {inject, singleton} from "tsyringe";
import {IWebService, IWebServiceName} from "./_core/WebService/constract/IWebService";

@singleton()
export default class MainApplication {
    constructor(@inject(IWebServiceName) webService: IWebService) {
        webService.run();
    }
}
