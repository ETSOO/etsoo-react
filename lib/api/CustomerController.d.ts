import { EntityController } from "./EntityController";
import { IApiUser } from "./IApiUser";
import { IApiSettings } from "./IApiSettings";
/**
 * Customer API controller
 */
export declare class CustomerController extends EntityController {
    /**
     * Constructor
     * @param settings Settings
     * @param user Current user
     */
    constructor(settings: IApiSettings, user: IApiUser);
}
