import { ILanguageItem } from "./IApiSettings";
/**
 * Current detected language
 */
export declare const detectedLanguage: string;
/**
 * Get the available language item
 * @param items Available languages
 * @param language Detected language
 */
export declare function getCurrentLanguage(items: ILanguageItem[], language: string): string | undefined;
