import {ServiceProvider} from "../_core/WebService/abstract/ServiceProvider";
import {inject, singleton} from "tsyringe";
import {UserController} from "../app/Users/UserController";

@singleton()
export class ControllerProvider extends ServiceProvider {
    protected container;

    constructor(@inject('container') container) {
        super();
        this.container = container;
    }

    register() {
        this.container.register('controllers', {
            useValue: [
                UserController,
            ]
        })
    }
}