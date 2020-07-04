import { EntityController } from "./EntityController";
import { ApiModule } from "./IApiEntity";
/**
 * User API controller
 */
export class UserController extends EntityController {
    /**
     * Constructor
     * @param settings Settings
     * @param user Current user
     */
    constructor(settings, user) {
        const entity = {
            identity: 'user',
            module: ApiModule.User
        };
        super(settings, user, entity);
    }
    /**
     * Login
     * @param model Login model
     */
    async login(model) {
        return this.formatResult((await this.api.post('login', model)).data);
    }
}
