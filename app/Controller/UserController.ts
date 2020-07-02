import {Controller} from "../_core/WebService/decorators/Controller";
import {Route} from "../_core/WebService/decorators/Route";
import {Request} from "../_core/WebService/decorators/Request";
import {Response} from "../_core/WebService/decorators/Response";
import DTO from "./DTO";
import {Body} from "../_core/WebService/decorators/Body";
import {HttpMethod} from "../_core/WebService/constants/HttpMethod";
import {Param} from "../_core/WebService/decorators/Param";

@Controller('users')
export default class UserController {
    @Route({path: 'hello/:userId'})
    hello(@Response response, test: number, @Body abc, @Param('userId') userId: number, @Request request) {
        console.log(userId);
        response.send("hello world");//
    }

    @Route({path: 'hello', method: HttpMethod.POST})
    hello2(@Response response, test:number, @Body abc: DTO, xyz:number, @Request request) {
        console.log(abc.wtf);
        response.send("post");
    }

    @Route({path: 'bye'})
    bye(@Response response, @Request request) {
        console.log('user bye ahi hi');
    }
}
