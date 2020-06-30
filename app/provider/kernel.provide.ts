import {container, instanceCachingFactory} from "tsyringe";
import {WebService} from "../../_core/service/WebService";

container.register("WebService", {
    useClass: WebService,
});
