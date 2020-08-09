import { IEntityController } from './IEntityController';

/**
 * Type limits supported address class
 */
export type AddressConstructor<T = IEntityController> = new (
    ...args: any[]
) => T;

/**
 * Extend class to support address APIs
 * @param controller Applied class
 */
export function ExtendAddress<C extends AddressConstructor>(controller: C) {
    // Extend applied class to support address APIs
    return class extends controller {
        /**
         * Get country list
         * @param organizationId Current organization id
         */
        countryList(organizationId?: number) {
            console.log(organizationId, this.entity.module);
        }
    };
}
