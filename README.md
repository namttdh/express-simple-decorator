# Express simple decorator
## Installation
requried:
```
https://github.com/microsoft/tsyringe
typescript
```
and install
```
npm install react-particles-js || yarn add react-particles-js

```
## How to use
1, Create controller by @Controller('prefix_router')
Example:
```
@Controller('users')
class UserController {
  @Route({path : 'test', method: HttpMethod.GET})
    async test(@Request req, @Response res): Promise<any> {
        //this controller will generator /users/test route with GET Method.
        
        //or res.send('hello world');
        return "hello world";
    }
}
```
2, Register controller and start service
Example
```
import {ExpressWebService} from "express-simple-decorator";
import {container} from "tsyringe";

container.register('controllers', {
            useValue: [
                UserController,
            ]
})

const expressService = container.resolve(ExpressWebService);
expressService.run();
```
3, edit .env to point to port whatever you want and your key application or default will running with port 3000.
``` diff
+ APPLICATION_KEY = key_of_application
+ APPLICATION_PORT = 3000
```
4, Start service and enjoy.
## Usage
### @Controller('prefix_route')
Description: It's define for all Route inside class
Example: Above
### @Route({object})
object with params:
```
path: Defind your path not include prefix route of @Controller
method: 'GET'. 'POST', 'PUT',
responseCode: it's response code.

```
It define route of url like:
```
/test
/test/:id
/test/:id/hello/:name
```
It's depen on you logic
Example: above
### @Request / @Response
It's take param request and param response express function, you can use it dynamic without remember it order.
Example:
```
@Controller('users')
class UserController {
  @Route({path : 'test', method: HttpMethod.GET})
    async test(@Request req, @Response res): Promise<any> {
        //You no need to remember it order, you can change it to
        //test(another_param, @Request req, another2_param,...)

        res.send(req.params.id);
        //order simple without param res return req.params.id;
    }
}

```
### @Param
When you defind route like:
@Route({path: 'users/:id/post/:postId'})
Then you have 2 options, 1 using @Request, 2 using @Param
There 2 way using @Param
```
@Route({path: 'users/:id/post/:postId'})
async test(@Param param)
then `param` variable take all prames like (id, postId)
and using by param.id, param.postId to get data
```
```
@Route({path: 'users/:id/post/:postId'})
async test(@Param('id') id, @Param('postId') postId)
then id take value from :id and postId take from :postId
```
### @Middleware
Defind middleware
Class middleware
```
import { BaseMiddleware, Middleware } from "express-simple-decorator";

@Middleware()
export default class AdminPermission extends BaseMiddleware {
    apply(req, res, next){
        if(req.user.role !== Role.ADMIN){
            res.send({ status: false, message: "Server Error", error: "User Are Not Authorized" });
        }
        next();
    }
}
```

Global middleware
```
add register
container.register('globalMiddleware', {
            useValue: [
                bodyParser.urlencoded({ extended: false }),
                //middleware 2
                //middleware 3
                //...etc
            ]
        });
```
Local Middleware
Using middleware for whole controller
```
@Controller('users')
@Middleware('name or function or class of middleware')
export class UserController {
}
```
Route Middleware
Using middleware for route only
```
@Controller('users')
export class UserController {
  @Middleware('name or function or class of middleware')
  async test(@Request request): Promise<any>
}
```
You can using tsyringe for specialy alias middleware
### @Body
Use https://github.com/typestack/class-validator to validate request before there going in route
Example:
```
import {IsEmail, Length} from "class-validator";

export class RegisterRequest {
    @IsEmail()
    email: string;

    @Length(6)
    password: string;
}

@Controller('users')
export class UserController {
@Route({ path: '/register', method: HttpMethod.POST })
    async register(@Body registerRequest: RegisterRequest): Promise<any> {
        //do register with registerRequest.email and registerRequest.password
    }
}
```
