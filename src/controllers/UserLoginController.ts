import { ApiModule } from '../api/IApiEntity';
import { LoginController } from './LoginController';
import { createModuleEntity } from './EntityController';

/**
 * User login API controller
 */
export class UserLoginController extends LoginController {
    /**
     * Constructor
     * @param dispatch User state dispatch
     */
    constructor() {
        super(createModuleEntity(ApiModule.User));
    }
}
