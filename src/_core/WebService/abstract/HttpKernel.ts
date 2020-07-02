import {container} from "tsyringe";
import {appConfig} from "../../../config/app.config";
import {ServiceProvider} from "./ServiceProvider";

export abstract class HttpKernel {
    protected middleware;

    register() {
        //register DC
        container.register('container', {
            useValue: container
        });
        let listProvider = [];
        //register all provider
        appConfig.provider.forEach((item: any) => {
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
            container.register(key, {
                useClass: value as any,
            });
        }
    }
}