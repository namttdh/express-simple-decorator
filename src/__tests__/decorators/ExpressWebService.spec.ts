import "reflect-metadata";
import {Body, Controller} from "../../decorators";
import {ExpressWebService} from "../../ExpressWebService";

describe("Test Express webservice", () => {
    @Controller('test')
    class TestBodyController {
        hello(@Body test) {
            return test;
        }
    }
    it('test register controller success', function () {
        new ExpressWebService([
            TestBodyController
        ], []).run();
    });
});