import * as assert from "assert";
import {ParamResolve} from "../../paramsResolve/ParamResolve";
import {Request} from "express";

describe("Test resolve param", () => {
    it('Haven\'t value', async () => {
        let resolve = new ParamResolve();
        let request = {
            params: {}
        };
        let result = await resolve.resolve(request as Request, null, null);
        assert.strictEqual(result, request.params);
    });

    it('Have value', async () => {
        let resolve = new ParamResolve();
        let request = {
            params: {
                'test': 1,
            }
        };
        let result = await resolve.resolve(request as unknown as Request, null, 'test');
        assert.strictEqual(result, 1);
    });
});