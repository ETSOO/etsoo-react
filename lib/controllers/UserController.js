import { EntityController } from "./EntityController";
import { ApiModule } from "../api/IApiEntity";
/**
 * User API controller
 */
export class UserController extends EntityController {
    /**
     * Constructor
     * @param user Current user
     * @param configs Configurations
     */
    constructor(user, configs) {
        super(user, {
            identity: 'user',
            module: ApiModule.User
        }, configs);
    }
}
