import express from "express";
import {singleton} from "tsyringe";

@singleton()
export class WebService {
    constructor() {
        const app: express.Application = express();
        app.listen(process.env.APPLICATION_PORT, function () {
            console.log('Application running');
        });

        return app;
    }
}