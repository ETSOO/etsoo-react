import { DataTypes } from '@etsoo/shared';
import { LoginMethod } from './LoginMethod';

/**
 * Application role
 */
export enum AppRole {
    /**
     * User
     */
    User = 3,

    /**
     * Customer
     */
    Customer = 6,

    /**
     * Supplier
     */
    Supplier = 7
}

/**
 * Configurable API settings
 */
export interface IApiConfigurable {
    /**
     * API endpoint
     */
    readonly endpoint: string;

    /**
     * App root url
     */
    readonly homepage: string;

    /**
     * Limited organization id
     */
    readonly org?: number;

    /**
     * Cloud web url
     */
    readonly webUrl: string;
}

/**
 * Configurable API settings host
 * Usually passed by window global configs property
 */
export interface IApiConfigurableHost {
    /**
     * Configurable API settings
     */
    configs: IApiConfigurable;
}

/**
 * API settings interface
 */
export interface IApiSettings extends IApiConfigurable {
    /**
     * Current language
     */
    readonly currentLanguage?: string;

    /**
     * Detected language
     */
    readonly detectedLanguage: string;

    /**
     * Login method
     */
    readonly method: LoginMethod.Web;

    /**
     * Application role
     */
    readonly role: AppRole;

    /**
     * Supported languages
     */
    readonly supportedLanguages: DataTypes.LanguageDefinition[];

    /**
     * Search input element
     */
    searchInput?: HTMLInputElement;
}
