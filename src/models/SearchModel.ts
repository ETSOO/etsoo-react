import { TiplistModel } from './TiplistModel';

/**
 * Search model
 */
export interface SearchModel extends TiplistModel {
    /**
     * Count total records
     */
    countTotal?: boolean;

    /**
     * View domain, not passed as a paramter
     */
    domain?: string;

    /**
     * View model
     */
    field?: string;

    /**
     * Is return structure
     */
    hasStructure?: boolean;

    /**
     * Order index
     * positive numbers indicate ascending
     * negative numbers indicate descending
     */
    orderIndex?: number;

    /**
     * Current page
     */
    page?: number;
}

/**
 * Org search model
 */
export interface SearchOrgModel extends SearchModel {
    /**
     * Full text search keywords
     */
    fulltext?: string;

    /**
     * Limit to current organization
     */
    limitToSelf?: boolean;

    /**
     * Organization id
     */
    organizationId?: number;
}

/**
 * Address search model
 */
export interface SearchAddressModel extends SearchOrgModel {
    /**
     * Country id
     */
    countryId?: string;

    /**
     * Region id
     */
    regionId?: number;

    /**
     * City id
     */
    cityId?: number;

    /**
     * District id
     */
    districtId?: number;

    /**
     * Address part
     */
    address?: string;

    /**
     * Postcode
     */
    postcode?: string;

    /**
     * Postcode part
     */
    postcodePart?: string;
}
