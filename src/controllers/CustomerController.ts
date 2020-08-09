import { EntityController } from './EntityController';
import { IApiUser } from '../api/IApiUser';
import { ApiModule } from '../api/IApiEntity';
import { CustomerSearchModel } from '../models/CustomerSearchModel';
import {
    CustomerSearchItem,
    CustomerSearchPersonItem,
    CustomerSearchAddressItem,
    CustomerSearchPersonLogoItem
} from '../views/CustomerSearchItem';
import { ISearchResult } from '../views/ISearchResult';
import { ExtendAddress } from './ExtendAddress';

/**
 * Customer API controller
 */
class CustomerControllerBase extends EntityController {
    /**
     * Constructor
     * @param user Current user
     */
    constructor(user: IApiUser) {
        super(user, {
            identity: 'customer',
            module: ApiModule.Customer
        });
    }

    /**
     * Search data
     * @param model Search condition data model
     */
    async search<D extends CustomerSearchItem>(model?: CustomerSearchModel) {
        const result = await super.searchBase<
            ISearchResult<D>,
            CustomerSearchModel
        >(model);
        return result;
    }

    /**
     * Search address items
     * @param model Search condition data model
     */
    async searchAddressItems(model?: CustomerSearchModel) {
        return this.search<CustomerSearchAddressItem>(
            EntityController.formatSearchModel('address', model)
        );
    }

    /**
     * Search person items
     * @param model Search condition data model
     */
    async searchPersonItems(model?: CustomerSearchModel) {
        return this.search<CustomerSearchPersonItem>(
            EntityController.formatSearchModel('person', model)
        );
    }

    /**
     * Search person logo items
     * @param model Search condition data model
     */
    async searchPersonLogoItems(model?: CustomerSearchModel) {
        return this.search<CustomerSearchPersonLogoItem>(
            EntityController.formatSearchModel('personlogo', model)
        );
    }
}

export const CustomerController = ExtendAddress(CustomerControllerBase);
