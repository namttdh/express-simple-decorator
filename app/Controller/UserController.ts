import {Controller} from "../_core/WebService/decorators/Controller";
import {Route} from "../_core/WebService/decorators/Route";
import {Request} from "../_core/WebService/decorators/Request";
import {Response} from "../_core/WebService/decorators/Response";

@Controller('users')
export default class UserController {
    @Route({path: 'hello'})
    hello(@Response response, @Request request) {
        response.send("hello world");
    }

    @Route({path: 'bye'})
    bye(@Response response, @Request request) {
        console.log('user bye ahi hi');
    }
}
