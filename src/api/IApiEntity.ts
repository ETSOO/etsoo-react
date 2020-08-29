import { IEntityController } from './IEntityController';

/**
 * Api modules
 */
export enum ApiModule {
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
 * Type for controller extension
 */
export type ControllerExtension<T = IEntityController> = new (
    ...args: any[]
) => T;

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
