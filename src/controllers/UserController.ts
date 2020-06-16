import { EntityController } from "./EntityController"
import { IApiUser } from "../api/IApiUser"
import { ApiModule } from "../api/IApiEntity"
import { IApiConfigs } from "./IApiConfigs"

/**
 * User API controller
 */
export class UserController extends EntityController
{
    /**
     * Constructor
     * @param user Current user
     * @param configs Configurations
     */
    constructor(user: IApiUser, configs: IApiConfigs) {
        super(user, {
            identity: 'user',
            module: ApiModule.User
        }, configs)
    }
}