import {container} from "tsyringe";
import AdminController from "../Controller/AdminController";
import UserController from "../Controller/UserController";

container.register('controllers', {
    useValue: [
        AdminController,
        UserController
    ],
});
