import { EntityController } from './EntityController';
import { ApiModule } from '../api/IApiEntity';

/**
 * User API controller
 */
export class UserController extends EntityController {
    /**
     * Constructor
     */
    constructor() {
        super({
            identity: 'user',
            module: ApiModule.User
        });
    }
}
