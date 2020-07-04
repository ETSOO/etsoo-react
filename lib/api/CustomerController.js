import { EntityController } from "./EntityController";
import { ApiModule } from "./IApiEntity";
/**
 * Customer API controller
 */
export class CustomerController extends EntityController {
    /**
     * Constructor
     * @param settings Settings
     * @param user Current user
     */
    constructor(settings, user) {
        const entity = {
            identity: 'customer',
            module: ApiModule.Customer
        };
        super(settings, user, entity);
    }
}
