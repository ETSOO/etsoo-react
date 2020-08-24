import { ApiModule } from '../api/IApiEntity';
import { LoginController } from './LoginController';

/**
 * User login API controller
 */
export class UserLoginController extends LoginController {
    /**
     * Constructor
     * @param dispatch User state dispatch
     */
    constructor() {
        super({
            identity: 'user',
            module: ApiModule.User
        });
    }
}
