import {container} from "tsyringe";
import {ServiceProvider} from "./index";

abstract class HttpKernel {
    protected middleware;

    abstract appConfig();

    register() {
        //register DC
        container.register('container', {
            useValue: container
        });
        let listProvider = [];
        //register all provider
        this.appConfig().provider.forEach((item: any) => {
            let provider = container.resolve(item) as ServiceProvider;
            provider.register();
            listProvider.push(provider);
        });
        //run boot for each provider
        listProvider.forEach(provider => {
            provider.boot();
        });

        //register global middleware
        for (const [key, value] of Object.entries(this.middleware)) {
            container.register(key, value as any);
        }
    }
}

export default HttpKernel;