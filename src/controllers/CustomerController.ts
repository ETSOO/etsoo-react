import { EntityController } from "./EntityController"
import { IApiUser } from "../api/IApiUser"
import { ApiModule } from "../api/IApiEntity"
import { IApiConfigs } from "./IApiConfigs"
import { CustomerSearchModel } from "../models/CustomerSearchModel"
import { CustomerSearchItem, CustomerSearchPersonItem, CustomerSearchAddressItem, CustomerSearchPersonLogoItem } from "../views/CustomerSearchItem"
import { ISearchResult } from "../views/ISearchResult"

/**
 * Customer API controller
 */
export class CustomerController extends EntityController
{
    /**
     * Constructor
     * @param user Current user
     */
    constructor(user: IApiUser, configs: IApiConfigs) {
        super(user, {
            identity: 'customer',
            module: ApiModule.Customer
        }, configs)
    }

    /**
     * Format search model
     * @param model Search condition
     * @param field Field
     */
    formatSearchModel(model: CustomerSearchModel | null, field: string) {
        if(model == null)
            return { field }
        else {
            model.field = field
            return model
        }  
    }

    /**
     * Search data
     * @param model Search condition data model
     */
    async search<D extends CustomerSearchItem>(model: CustomerSearchModel | null = null) {
        return await super.searchBase<ISearchResult<D>, CustomerSearchModel>(model)
    }

    /**
     * Search address items
     * @param model Search condition data model
     */
    async searchAddressItems(model: CustomerSearchModel | null = null) {
        return this.search<CustomerSearchAddressItem>(this.formatSearchModel(model, 'address'))
    }

    /**
     * Search person items
     * @param model Search condition data model
     */
    async searchPersonItems(model: CustomerSearchModel | null = null) {
        return this.search<CustomerSearchPersonItem>(this.formatSearchModel(model, 'person'))
    }

    /**
     * Search person logo items
     * @param model Search condition data model
     */
    async searchPersonLogoItems(model: CustomerSearchModel | null = null) {
        return this.search<CustomerSearchPersonLogoItem>(this.formatSearchModel(model, 'personlogo'))
    }
}