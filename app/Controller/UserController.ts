import {GET} from "../_core/decorators/express/constant/HttpMethod";
import {Controller} from "../_core/decorators/express/Controller";
import {Route} from "../_core/decorators/express/Route";

@Controller('users')
export default class UserController {

    @Route({path: 'hello', method: GET})
    hello(req, res) {
        res.send('hello world');
    }
}