/* eslint-disable camelcase */
import { ControllerExtension } from '../api/IApiEntity';

/**
 * Continents
 */
export enum CountryContinent {
    /**
     * Africa
     */
    AF = 1,

    /**
     * Antarctica
     */
    AN = 2,

    /**
     * Asia
     */
    AS = 3,

    /**
     * Europe
     */
    EU = 4,

    /**
     * North America
     */
    NA = 5,

    /**
     * Oceania
     */
    OC = 6,

    /**
     * South America
     */
    SA = 7
}

/**
 * Country list item
 */
export interface CountryListItem {
    /**
     * Unique id like CN, US
     */
    id: string;

    /**
     * 3 characters id, like CHN
     */
    id3: string;

    /**
     * International phone callback code
     */
    nid: string;

    /**
     * International phone call code, 00 for China
     */
    idd: string;

    /**
     * International phone area code, 86 for China
     */
    code: string;

    /**
     * Currency id, 156
     */
    currency: string;

    /**
     * Continent
     */
    continent: CountryContinent;

    /**
     * Full name
     */
    name: string;

    /**
     * Short name
     */
    shortName?: string;
}

// Country list item raw format
interface CountryListRawItem {
    currency_id: string;
    continent_id: number;
    short_name?: string;
}

/**
 * Extend class to support address APIs
 * @param controller Applied class
 */
export function ExtendAddress<C extends ControllerExtension>(controller: C) {
    // Extend applied class to support address APIs
    return class extends controller {
        /**
         * Get country list
         * @param organizationId Current organization id
         */
        async countryList(organizationId?: number) {
            const url = this.buildEntityApi(
                `CountryList/${organizationId || ''}`
            );
            return this.api.get<CountryListItem[]>(url, undefined, {
                parser: (data: CountryListRawItem[]) => {
                    return [
                        undefined,
                        data.map((item) => {
                            const {
                                currency_id: currency,
                                continent_id,
                                short_name: shortName,
                                ...rest
                            } = item;
                            const continent = <CountryContinent>continent_id;
                            return {
                                continent,
                                currency,
                                shortName,
                                ...rest
                            } as CountryListItem;
                        })
                    ];
                }
            });
        }
    };
}
