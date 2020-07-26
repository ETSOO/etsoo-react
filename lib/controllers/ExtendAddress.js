/**
 * Extend class to support address APIs
 * @param controller Applied class
 */
export function ExtendAddress(controller) {
    // Extend applied class to support address APIs
    return class extends controller {
        /**
         * Get country list
         * @param organizationId Current organization id
         */
        countryList(organizationId) {
            console.log(organizationId, this.entity.module);
        }
    };
}
