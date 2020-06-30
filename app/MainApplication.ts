import {inject, singleton} from "tsyringe";
import {Application} from "express";

@singleton()
export default class MainApplication {
    constructor(@inject("WebService") private webService: Application) {
        webService.get('/', function (req, res) {
            res.send('hello world 2');
        })
    }
}
