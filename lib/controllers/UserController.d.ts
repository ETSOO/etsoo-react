import { EntityController } from "./EntityController";
import { IApiUser } from "../api/IApiUser";
import { IApiConfigs } from "./IApiConfigs";
/**
 * User API controller
 */
export declare class UserController extends EntityController {
    /**
     * Constructor
     * @param user Current user
     * @param configs Configurations
     */
    constructor(user: IApiUser, configs: IApiConfigs);
}
