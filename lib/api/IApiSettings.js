import { LanguageStateCreator } from "../states/LanguageState";
/**
 * Application role
 */
export var AppRole;
(function (AppRole) {
    /**
     * User
     */
    AppRole[AppRole["User"] = 3] = "User";
    /**
     * Customer
     */
    AppRole[AppRole["Customer"] = 6] = "Customer";
    /**
     * Supplier
     */
    AppRole[AppRole["Supplier"] = 7] = "Supplier";
})(AppRole || (AppRole = {}));
// Settings
let apiSettings;
// Context
let languageContext;
// Provider
let lanugageProvider;
/**
 * Setup
 * @param settings Settings
 */
const setup = (settings) => {
    // Set
    apiSettings = settings;
    // Default language item
    const languageItem = settings.supportedLanguages.find(l => l.name === settings.currentLanguage);
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
const setSearchInput = (input) => {
    apiSettings.searchInput = input;
};
/**
 * API settings utils
 */
export const ApiSettings = {
    get: () => {
        return apiSettings;
    },
    languageContext: () => {
        return languageContext;
    },
    lanugageProvider: () => {
        return lanugageProvider;
    },
    setSearchInput,
    setup
};
