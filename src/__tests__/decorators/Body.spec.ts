import "reflect-metadata";
import {Body} from "../../decorators";
import * as assert from "assert";
import {PARAMS_DECORATOR_KEY} from "../../decorators/paramsHelper";
import {ParamsType} from "../../constants/ParamsType";

describe("Test body params", () => {
    class TestBodyController {
        hello(test2: any, @Body test) {
            return test;
        }
    }
    it('Body params success register', function () {
        let test = Reflect.getMetadata(PARAMS_DECORATOR_KEY, TestBodyController);
        assert.strictEqual(test.get('hello')[0].type, ParamsType.BODY);
    });
});