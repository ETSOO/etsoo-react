import { ApiModule } from '../api/IApiEntity';
import { LoginController } from './LoginController';
import { createModuleEntity } from './EntityController';

/**
 * Customer login API controller
 */
export class CustomerLoginController extends LoginController {
    /**
     * Constructor
     */
    constructor() {
        super(createModuleEntity(ApiModule.Customer));
    }
}
