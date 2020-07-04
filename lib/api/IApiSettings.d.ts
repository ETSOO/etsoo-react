/// <reference types="react" />
import { LoginMethod } from "./LoginMethod";
import { ILanguage, LanguageAction } from "../states/LanguageState";
import { IUpdate } from "../states/IState";
/**
 * Language definiton item
 */
export interface ILanguageItem {
    /**
     * Name, like zh-CN
     */
    readonly name: string;
    /**
     * Label for description, like Simplifined Chinese
     */
    readonly label: string;
    /**
     * Labels
     */
    readonly labels: any;
}
/**
 * Application role
 */
export declare enum AppRole {
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
 * API settings interface
 */
export interface IApiSettings {
    /**
     * Current language
     */
    readonly currentLanguage?: string;
    /**
     * Detected language
     */
    readonly detectedLanguage: string;
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
    readonly supportedLanguages: ILanguageItem[];
    /**
     * Search input element
     */
    searchInput?: HTMLInputElement;
    /**
     * User token
     */
    token?: string;
    /**
     * Cloud web url
     */
    readonly webUrl: string;
}
/**
 * API settings utils
 */
export declare const ApiSettings: {
    get: () => IApiSettings;
    languageContext: () => import("react").Context<IUpdate<ILanguage, LanguageAction>>;
    lanugageProvider: () => import("react").FunctionComponent<{}>;
    setSearchInput: (input: HTMLInputElement) => void;
    setup: (settings: IApiSettings) => {
        context: import("react").Context<IUpdate<ILanguage, LanguageAction>>;
        provider: import("react").FunctionComponent<{}>;
    };
};
