import { EntityController } from './EntityController';
import { ApiModule } from '../api/IApiEntity';
import { ExtendAddress } from './ExtendAddress';
/**
 * Customer API controller
 */
class CustomerControllerBase extends EntityController {
    /**
     * Constructor
     * @param user Current user
     */
    constructor(user, configs) {
        super(user, {
            identity: 'customer',
            module: ApiModule.Customer
        }, configs);
    }
    /**
     * Search data
     * @param model Search condition data model
     */
    async search(model) {
        const result = await super.searchBase(model);
        return result;
    }
    /**
     * Search address items
     * @param model Search condition data model
     */
    async searchAddressItems(model) {
        return this.search(EntityController.formatSearchModel('address', model));
    }
    /**
     * Search person items
     * @param model Search condition data model
     */
    async searchPersonItems(model) {
        return this.search(EntityController.formatSearchModel('person', model));
    }
    /**
     * Search person logo items
     * @param model Search condition data model
     */
    async searchPersonLogoItems(model) {
        return this.search(EntityController.formatSearchModel('personlogo', model));
    }
}
export const CustomerController = ExtendAddress(CustomerControllerBase);
