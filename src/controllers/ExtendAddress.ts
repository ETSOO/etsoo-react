import { IEntityController } from "./IEntityController"

/**
 * Type limits supported class
 */
export type Constructor<T = IEntityController> = new (...args: any[]) => T

/**
 * Extend class to support address APIs
 * @param controller Applied class
 */
export function ExtendAddress<C extends Constructor>(controller : C) {
    // Extend applied class to support address APIs
    return class extends controller {
        /**
         * Get country list
         * @param organizationId Current organization id
         */
        countryList(organizationId?: number) {
            console.log('country list ' + this.entity.module)
        }
    }
}