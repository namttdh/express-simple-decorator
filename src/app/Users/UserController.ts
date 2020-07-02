import {Controller} from "../../_core/WebService/decorators/Controller";
import {Route} from "../../_core/WebService/decorators/Route";
import {HttpMethod} from "../../_core/WebService/constants/HttpMethod";
import {Length, Min} from "class-validator";
import {Middleware} from "../../_core/WebService/decorators/Middleware";
import {AdminMiddleware} from "../AdminMiddleware";

class testDTO {
    @Length(10)
    public name: string;
}

//users/register
@Controller('users')
export class UserController {
    @Middleware(AdminMiddleware)
    @Route({path: 'register', method: HttpMethod.GET})
    register() {
        return 'hello world';
    }
}

