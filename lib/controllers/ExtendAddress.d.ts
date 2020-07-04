import { IEntityController } from "./IEntityController";
/**
 * Type limits supported class
 */
export declare type Constructor<T = IEntityController> = new (...args: any[]) => T;
/**
 * Extend class to support address APIs
 * @param controller Applied class
 */
export declare function ExtendAddress<C extends Constructor>(controller: C): {
    new (...args: any[]): {
        /**
         * Get country list
         * @param organizationId Current organization id
         */
        countryList(organizationId?: number | undefined): void;
        api: import("axios").AxiosInstance;
        entity: import("..").IApiEntity;
        singleton: import("./ApiSingleton").ApiSingleton;
        user: import("..").IApiUser;
    };
} & C;
