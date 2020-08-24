import { ApiModule } from '../api/IApiEntity';
import { LoginController } from './LoginController';

/**
 * Customer login API controller
 */
export class CustomerLoginController extends LoginController {
    /**
     * Constructor
     */
    constructor() {
        super({
            identity: 'customer',
            module: ApiModule.Customer
        });
    }
}
