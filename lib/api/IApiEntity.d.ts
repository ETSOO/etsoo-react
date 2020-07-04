/**
 * Api modules
 */
export declare enum ApiModule {
    System = 0,
    Organization = 1,
    Dept = 2,
    User = 3,
    Article = 4,
    Website = 5,
    Customer = 6,
    Supplier = 7,
    Product = 8,
    Order = 9,
    PO = 10
}
/**
 * Api entity interface
 */
export interface IApiEntity {
    /**
     * Entity identity like user/customer
     */
    readonly identity: string;
    /**
     * Entity module
     */
    readonly module: ApiModule;
}
