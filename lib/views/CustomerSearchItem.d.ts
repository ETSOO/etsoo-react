import { ISearchItem } from './ISearchResult';
/**
 * Customer search default item
 */
export interface CustomerSearchItem extends ISearchItem {
    /**
     * Cid
     */
    readonly cid?: string;
    /**
     * Description
     */
    readonly description?: string;
    /**
     * Entry date
     */
    readonly entry_date?: Date;
    /**
     * Id
     */
    readonly id: number;
    /**
     * Name
     */
    readonly name: string;
}
/**
 * Customer search with address item
 */
export interface CustomerSearchAddressItem extends CustomerSearchItem {
    /**
     * Address
     */
    readonly address?: string;
}
/**
 * Customer search person item
 */
export interface CustomerSearchPersonItem extends CustomerSearchAddressItem {
    /**
     * Birth date
     */
    readonly birthday?: Date;
    /**
     * Gender
     */
    readonly gender?: string;
}
/**
 * Customer search person with logo item
 */
export interface CustomerSearchPersonLogoItem extends CustomerSearchPersonItem {
    /**
     * Logo
     */
    readonly logo?: string;
}
