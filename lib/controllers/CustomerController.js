import { EntityController } from "./EntityController";
import { ApiModule } from "../api/IApiEntity";
import { ExtendAddress } from "./ExtendAddress";
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
     * Format search model
     * @param model Search condition
     * @param field Field
     */
    formatSearchModel(model, field) {
        if (model == null)
            return { field };
        else {
            model.field = field;
            return model;
        }
    }
    /**
     * Search data
     * @param model Search condition data model
     */
    async search(model = undefined) {
        return await super.searchBase(model);
    }
    /**
     * Search address items
     * @param model Search condition data model
     */
    async searchAddressItems(model = undefined) {
        return this.search(this.formatSearchModel(model, 'address'));
    }
    /**
     * Search person items
     * @param model Search condition data model
     */
    async searchPersonItems(model = undefined) {
        return this.search(this.formatSearchModel(model, 'person'));
    }
    /**
     * Search person logo items
     * @param model Search condition data model
     */
    async searchPersonLogoItems(model = undefined) {
        return this.search(this.formatSearchModel(model, 'personlogo'));
    }
}
export const CustomerController = ExtendAddress(CustomerControllerBase);
