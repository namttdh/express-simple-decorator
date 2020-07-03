import {IParamsResolve} from "../constract/IParamsResolve";
import {Request, Response} from "express";
import {container} from "tsyringe";
import {validate} from "class-validator";

export class BodyParamsResolve implements IParamsResolve{
    async resolve(request: Request, response: Response, type) {
        if (type.name === 'Object') {
            return request.body;
        }

        let dto = container.resolve(type);

        for (const [key, value] of Object.entries(request.body)) {
            dto[key] = value;
        }

        let validatePromise = await validate(dto);

        if (validatePromise.length > 0) {
            response.send(validatePromise);
        }

        return dto;
    }
}
