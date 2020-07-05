import "reflect-metadata";
import * as assert from "assert";
import {Middleware} from "../../decorators";
import {container} from "tsyringe";

describe("Test middleware", () => {
    @Middleware()
    class TestMiddleware {
        public random = null;
        constructor() {
            this.random = Math.floor(Math.random() * Math.floor(9999));
        }
    }

    it('Test middleware singleton', function () {
        let controller1 = container.resolve(TestMiddleware);
        let controller2 = container.resolve(TestMiddleware);

        assert.strictEqual(controller1.random, controller2.random)

    });
});