import { ILanguageItem } from './IApiSettings';
import { ISearchItem } from '../views/ISearchResult';
import { DataType } from './DataType';
/**
 * Cache kind
 */
export declare enum CacheKind {
    /**
     * Router pop action only
     */
    PopOnly = 1,
    /**
     * Cache in a minute
     */
    InMinute = 2,
    /**
     * During the session
     */
    Session = 4
}
/**
 * Utils
 */
export declare const Utils: {
    applyMixins: (derivedCtor: any, baseCtors: any[]) => void;
    cacheSessionData: (data: object, key: string) => void;
    cacheSessionDataGet: (key: string) => string | null | undefined;
    cacheSessionDataParse: <T>(key: string) => T | undefined;
    cacheSessionString: (data: string, key: string) => void;
    detectedLanguage: string;
    dimensionEqual: (d1?: DOMRect | undefined, d2?: DOMRect | undefined) => boolean;
    formatUpperLetter: (word: string) => string;
    formDataToObject: (formData: FormData) => {
        [k: string]: FormDataEntryValue;
    };
    getCurrentLanguage: (items: ILanguageItem[], language: string) => string | undefined;
    getLocationKey: (key: string) => string;
    joinItems: (...items: (string | undefined)[]) => string;
    mergeClasses: (...classNames: (string | undefined)[]) => string;
    parseNumber: (rawData: string | number | undefined | object) => number;
    snakeNameToWord: (name: string, firstOnly?: boolean) => string;
    sortItems: (items: (ISearchItem | undefined)[], field: string, type: DataType, ascending: boolean) => void;
};
