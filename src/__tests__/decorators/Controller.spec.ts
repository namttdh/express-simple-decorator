import "reflect-metadata";
import * as assert from "assert";
import {Controller} from "../../decorators";
import {container} from "tsyringe";

describe("Test controller", () => {
    @Controller('test')
    class TestBodyController {
        public random = null;
        constructor() {
            this.random = Math.floor(Math.random() * Math.floor(9999));
        }
    }
    it('Test controller singleton', function () {
        let controller1 = container.resolve(TestBodyController);
        let controller2 = container.resolve(TestBodyController);

        assert.strictEqual(controller1.random, controller2.random)
    });
});