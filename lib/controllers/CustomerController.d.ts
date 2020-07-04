import { EntityController } from "./EntityController";
import { IApiUser } from "../api/IApiUser";
import { IApiConfigs } from "./IApiConfigs";
import { CustomerSearchModel } from "../models/CustomerSearchModel";
import { CustomerSearchItem, CustomerSearchPersonItem, CustomerSearchAddressItem, CustomerSearchPersonLogoItem } from "../views/CustomerSearchItem";
import { ISearchResult } from "../views/ISearchResult";
/**
 * Customer API controller
 */
declare class CustomerControllerBase extends EntityController {
    /**
     * Constructor
     * @param user Current user
     */
    constructor(user: IApiUser, configs: IApiConfigs);
    /**
     * Format search model
     * @param model Search condition
     * @param field Field
     */
    formatSearchModel(model: CustomerSearchModel | undefined, field: string): CustomerSearchModel;
    /**
     * Search data
     * @param model Search condition data model
     */
    search<D extends CustomerSearchItem>(model?: CustomerSearchModel | undefined): Promise<ISearchResult<D>>;
    /**
     * Search address items
     * @param model Search condition data model
     */
    searchAddressItems(model?: CustomerSearchModel | undefined): Promise<ISearchResult<CustomerSearchAddressItem>>;
    /**
     * Search person items
     * @param model Search condition data model
     */
    searchPersonItems(model?: CustomerSearchModel | undefined): Promise<ISearchResult<CustomerSearchPersonItem>>;
    /**
     * Search person logo items
     * @param model Search condition data model
     */
    searchPersonLogoItems(model?: CustomerSearchModel | undefined): Promise<ISearchResult<CustomerSearchPersonLogoItem>>;
}
export declare const CustomerController: {
    new (...args: any[]): {
        countryList(organizationId?: number | undefined): void;
        api: import("axios").AxiosInstance;
        entity: import("../api/IApiEntity").IApiEntity;
        singleton: import("./ApiSingleton").ApiSingleton;
        user: IApiUser;
    };
} & typeof CustomerControllerBase;
export {};
