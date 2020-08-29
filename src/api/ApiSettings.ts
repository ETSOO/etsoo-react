import { IApiSettings } from './IApiSettings';
import {
    LanguageStateCreator,
    ILanguage,
    LanguageAction
} from '../states/LanguageState';
import { IUpdate } from '../states/IState';
import { ApiSingleton } from './ApiSingleton';

/**
 * Api settings
 */
export namespace ApiSettings {
    // Settings
    let apiSettings: IApiSettings;

    // Singleton
    let apiSingleton: ApiSingleton;

    // Context
    let languageContext: React.Context<IUpdate<ILanguage, LanguageAction>>;

    // Provider
    let lanugageProvider: React.FunctionComponent<{}>;

    /**
     * Get api settings
     */
    export const get = () => apiSettings;

    /**
     * Get api singleton
     */
    export const singleton = () => apiSingleton;

    /**
     * Get language context
     */
    export const context = () => languageContext;

    /**
     * Get language provider
     */
    export const provider = () => lanugageProvider;

    /**
     * Setup
     * @param settings Settings
     * @param api Api singleton
     */
    export const setup = (settings: IApiSettings, api: ApiSingleton) => {
        // Set
        apiSettings = settings;
        apiSingleton = api;

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
    export const setSearchInput = (input: HTMLInputElement): void => {
        apiSettings.searchInput = input;
    };
}
