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
 * Region list item
 */
export interface RegionListItem {
    /**
     * Number id
     */
    id: number;

    /**
     * Allocated id
     */
    cid?: string;

    /**
     * National belong id
     */
    nid?: string;

    /**
     * Abbreviation
     */
    abbr?: string;

    /**
     * Name
     */
    name: string;
}

/**
 * City list item
 */
export interface CityListItem {
    /**
     * Number id
     */
    id: number;

    /**
     * Allocated id
     */
    cid?: string;

    /**
     * National belong id
     */
    nid?: string;

    /**
     * Rank
     */
    rank?: number;

    /**
     * Phone code
     */
    phoneCode?: string;

    /**
     * Merge id
     */
    mergeId?: number;

    /**
     * Name
     */
    name: string;
}

// City list item raw format
interface CityListRawItem {
    phone_code?: string;
    merge_id?: number;
}

/**
 * District list item
 */
export interface DistrictListItem {
    /**
     * Number id
     */
    id: number;

    /**
     * National belong id
     */
    nid?: string;

    /**
     * Post code
     */
    postcode?: string;

    /**
     * Name
     */
    name: string;
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
                defaultValue: [],
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

        /**
         * Get region list
         * @param country Country id or name
         * @param organizationId Current organization id
         */
        async regionList(country: string, organizationId?: number) {
            const url = this.buildEntityApi(
                `RegionList/${country}/${organizationId || ''}`
            );

            return this.api.get<RegionListItem[]>(url, undefined, {
                defaultValue: []
            });
        }

        /**
         * Get city list
         * @param region Region id or name
         * @param organizationId Current organization id
         */
        async cityList(region: string, organizationId?: number) {
            const url = this.buildEntityApi(
                `CityList/${region}/${organizationId || ''}`
            );

            return this.api.get<CityListItem[]>(url, undefined, {
                defaultValue: [],
                parser: (data: CityListRawItem[]) => {
                    return [
                        undefined,
                        data.map((item) => {
                            const {
                                phone_code: phoneCode,
                                merge_id: mergeId,
                                ...rest
                            } = item;
                            return {
                                phoneCode,
                                mergeId,
                                ...rest
                            } as CityListItem;
                        })
                    ];
                }
            });
        }

        /**
         * Get district list
         * @param city City id or name
         * @param organizationId Current organization id
         */
        async districtList(city: string, organizationId?: number) {
            const url = this.buildEntityApi(
                `DistrictList/${city}/${organizationId || ''}`
            );

            return this.api.get<DistrictListItem[]>(url, undefined, {
                defaultValue: []
            });
        }
    };
}
