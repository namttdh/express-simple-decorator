import {Controller} from "../_core/WebService/decorators/Controller";
import {Route} from "../_core/WebService/decorators/Route";

@Controller('admin')
export default class AdminController {
    @Route({path: 'hello'})
    hello(req, res) {
        console.log('i\'m admin');
    }
}
