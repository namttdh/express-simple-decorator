import {singleton} from "tsyringe";
import {Length} from "class-validator";

@singleton()
export default class DTO{
    @Length(10, 20, { // here, $constraint1 will be replaced with "10", and $value with actual supplied value
        message: "Cawc $constraint1 characters, but actual is $value"
    })
    public wtf:string;

    constructor() {
        console.log('world');
    }
}