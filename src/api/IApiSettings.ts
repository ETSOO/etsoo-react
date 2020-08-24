import { DataTypes } from '@etsoo/shared';
import { LoginMethod } from './LoginMethod';
import {
    LanguageStateCreator,
    ILanguage,
    LanguageAction
} from '../states/LanguageState';
import { IUpdate } from '../states/IState';

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

// Settings
let apiSettings: IApiSettings;

// Context
let languageContext: React.Context<IUpdate<ILanguage, LanguageAction>>;

// Provider
let lanugageProvider: React.FunctionComponent<{}>;

/**
 * Setup
 * @param settings Settings
 */
const setup = (settings: IApiSettings) => {
    // Set
    apiSettings = settings;

    // Default language item
    const languageItem = settings.supportedLanguages.find(
        (l) => l.name === settings.currentLanguage
    );

    // Language state
    const state = LanguageStateCreator(languageItem);
    languageContext = state.context;
    lanugageProvider = state.provider;

    // Return
    return state;
};

/**
 * Set search input element
 * @param input Search input
 */
const setSearchInput = (input: HTMLInputElement): void => {
    apiSettings.searchInput = input;
};

/**
 * API settings utils
 */
export const ApiSettings = {
    get: () => apiSettings,

    languageContext: () => languageContext,

    lanugageProvider: () => lanugageProvider,

    setSearchInput,

    setup
};
