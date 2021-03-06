import { EntityController, createModuleEntity } from './EntityController';
import { ApiModule } from '../api/IApiEntity';

/**
 * User API controller
 */
export class UserController extends EntityController {
    /**
     * Constructor
     */
    constructor() {
        super(createModuleEntity(ApiModule.User));
    }
}
