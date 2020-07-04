import { ApiModule } from "../api/IApiEntity";
import { LoginController } from "./LoginController";
/**
 * User login API controller
 */
export class UserLoginController extends LoginController {
    /**
     * Constructor
     * @param user Current user
     * @param configs Configurations
     * @param dispatch User state dispatch
     *
     */
    constructor(user, configs, dispatch) {
        super(user, {
            identity: 'user',
            module: ApiModule.User
        }, configs, dispatch);
    }
}
