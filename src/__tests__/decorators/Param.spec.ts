import "reflect-metadata";
import {Param} from "../../decorators";
import * as assert from "assert";
import {PARAMS_DECORATOR_KEY} from "../../decorators/paramsHelper";

describe("Test params", () => {
    class TestBodyController {
        hello(@Param test) {}
        haveValue(@Param('id') test) {}
    }
    it('Haven\'t value', function () {
        let test = Reflect.getMetadata(PARAMS_DECORATOR_KEY, TestBodyController);
        assert.strictEqual(test.get('hello')[0].objectTransfer, null);
    });

    it('Have value', function () {
        let test = Reflect.getMetadata(PARAMS_DECORATOR_KEY, TestBodyController);
        assert.strictEqual(test.get('haveValue')[0].objectTransfer, 'id');
    });
});