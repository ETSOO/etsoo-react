import { EntityController } from './EntityController';
import { IApiUser } from '../api/IApiUser';
import { ApiModule } from '../api/IApiEntity';

/**
 * User API controller
 */
export class UserController extends EntityController {
    /**
     * Constructor
     * @param user Current user
     */
    constructor(user: IApiUser) {
        super(user, {
            identity: 'user',
            module: ApiModule.User
        });
    }
}
