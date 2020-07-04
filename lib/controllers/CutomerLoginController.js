import { ApiModule } from "../api/IApiEntity";
import { LoginController } from "./LoginController";
/**
 * Customer login API controller
 */
export class CustomerLoginController extends LoginController {
    /**
     * Constructor
     * @param user Current user
     * @param configs Configurations
     * @param dispatch User state dispatch
     *
     */
    constructor(user, configs, dispatch) {
        super(user, {
            identity: 'customer',
            module: ApiModule.Customer
        }, configs, dispatch);
    }
}
