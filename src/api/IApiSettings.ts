import { LoginMethod } from "./LoginMethod"
import { LanguageStateCreator, ILanguage, LanguageAction } from "../states/LanguageState"
import { IUpdate } from "../states/IState"

/**
 * Language definiton item
 */
export interface ILanguageItem {
    /**
     * Name, like zh-CN
     */
    readonly name: string

    /**
     * Label for description, like Simplifined Chinese
     */
    readonly label: string

    /**
     * Labels
     */
    readonly labels: any
}

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
 * API settings interface
 */
export interface IApiSettings {
    /**
     * Current language
     */
    readonly currentLanguage?: string

    /**
     * Detected language
     */
    readonly detectedLanguage: string

    /**
     * API endpoint
     */
    readonly endpoint: string

    /**
     * Limited organization id
     */
    readonly org?: number

    /**
     * Login method
     */
    readonly method: LoginMethod.Web

    /**
     * Application role
     */
    readonly role: AppRole

    /**
     * Supported languages
     */
    readonly supportedLanguages: ILanguageItem[]

    /**
     * User token
     */
    token?: string

    /**
     * Web url
     */
    readonly webUrl: string
}

// Settings
let apiSettings: IApiSettings

// Context
let languageContext: React.Context<IUpdate<ILanguage, LanguageAction>>

// Provider
let lanugageProvider: React.FunctionComponent<{}>

/**
 * Setup
 * @param settings Settings
 */
const setup = (settings: IApiSettings) => {
    // Set
    apiSettings = settings

    // Default language item
    const languageItem = settings.supportedLanguages.find(l => l.name === settings.currentLanguage)

    // Language state
    const state = LanguageStateCreator(languageItem)
    languageContext = state.context
    lanugageProvider = state.provider

    // Return
    return state
}

/**
 * API settings utils
 */
export const ApiSettings = {
    get: () => {
        return apiSettings
    },

    languageContext: () => {
        return languageContext
    },

    lanugageProvider: () => {
        return lanugageProvider
    },

    setup
}