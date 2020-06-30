import {inject, singleton} from "tsyringe";
import ControllerRegister from "./ControllerRegister";

@singleton()
export default class MainApplication {
    constructor(private controllerRegister: ControllerRegister) { }
}
