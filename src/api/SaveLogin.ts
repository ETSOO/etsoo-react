import { StorageUtils } from '@etsoo/shared';
import { ApiSettings } from './ApiSettings';

/**
 * Save login utilities
 */
export namespace SaveLogin {
    /**
     * Get save login key
     */
    const getSaveLoginKey = (): string => {
        // API settings
        const settings = ApiSettings.get();

        // Act
        return `etsoo-savelogin-${settings?.role}`;
    };

    /**
     * Save login data interface
     */
    export interface Data {
        /**
         * User id
         */
        readonly id: number;

        /**
         * Raw user id for login
         */
        readonly rawId: string;

        /**
         * Token
         */
        token?: string;
    }

    /**
     * Get data
     */
    export const get = (): Data | undefined => {
        const data = localStorage.getItem(getSaveLoginKey());
        if (data) {
            return JSON.parse(data) as Data;
        }

        return undefined;
    };

    /**
     * Save
     * @param data Save login data
     */
    export const save = (data: Data): void => {
        // Add or update
        StorageUtils.cacheLocalData(getSaveLoginKey(), data);
    };

    /**
     * Update token
     * @param token Save login token
     */
    export const update = (token?: string): void => {
        const data = get();
        if (data) {
            data.token = token;
            save(data);
        }
    };
}
