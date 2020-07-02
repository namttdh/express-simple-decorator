import {BaseMiddleware} from "../_core/WebService/abstract/BaseMiddleware";
import {Middleware} from "../_core/WebService/decorators/Middleware";

@Middleware()
export class AdminMiddleware extends BaseMiddleware{
    apply(request, response, next) {
        // response.send('going middleware');
        next();
    }
}