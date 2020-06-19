import { ILanguageItem } from "./IApiSettings"
import { ISearchItem } from "../views/ISearchResult"
import { DataType } from "./DataType"

/**
 * Cache session data
 * @param data Data
 * @param key Key
 */
const cacheSessionData = (data: object, key: string) => {
    cacheSessionString(JSON.stringify(data), key)
}

/**
 * Get cache session data
 * @param key Key
 */
const cacheSessionDataGet = (key: string) => {
    // Is supported
    if(window.sessionStorage) {
        return window.sessionStorage.getItem(key)
    } else {
        return undefined
    }
}

/**
 * Cache session data parse to specific type
 * @param key Key
 */
const cacheSessionDataParse = <T>(key: string) => {
    // Data
    const data = cacheSessionDataGet(key)

    // Parse data type
    if(data)
        return JSON.parse(data) as T
}

/**
 * Cache session data
 * @param data Data
 * @param key Key
 */
const cacheSessionString = (data: string, key: string) => {
    // Is supported
    if(window.sessionStorage) {
        window.sessionStorage.setItem(key, data)
    }
}

/**
 * Current detected language
 */
const detectedLanguage = (() => {
    // URL first, then local storage
    let language: string | null
    try {
        language = new URL(location.href).searchParams.get('lang') || localStorage.getItem('lang')
    } catch {
        language = null
    }

    // Browser detected
    if(language == null)
        language = (navigator.languages && navigator.languages[0]) || navigator.language

    // Return
    return language
})()

/**
 * Is two dimensions equal
 * @param d1 Dimension 1
 * @param d2 Dimension 2
 */
const dimensionEqual = (d1?: DOMRect, d2?: DOMRect) => {
    if(d1 == null && d2 == null)
        return true
    if(d1 == null || d2 == null)
        return false
    if(d1.left == d2.left && d1.top == d2.top && d1.right == d2.right && d1.bottom == d2.bottom)
        return true
    return false
}

/**
 * Format word's first letter to upper case
 * @param word Word
 */
const formatUpperLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

/**
 * Form data to object
 * @param formData Form data
 */
const formDataToObject = (formData: FormData) => {
    return Object.fromEntries(formData)
}

/**
 * Get the available language item
 * @param items Available languages
 * @param language Detected language
 */
const getCurrentLanguage = (items: ILanguageItem[], language: string) => {
    if(items.length == 0)
        return undefined
    return (items.find(item => item.name === language) || items[0]).name
}

/**
 * Get an unique key combined with current URL
 * @param key Key
 */
const getLocationKey = (key: string) => {
    return window.location.href + ':' + key
}

/**
 * Join items as a string
 * @param items Items
 */
const joinItems = (...items: (string | undefined)[]) => {
    return items.filter(item => item != null).join(', ')
}

/**
 * Merge class names
 * @param classNames Class names
 */
const mergeClasses = (...classNames: (string | undefined)[]) => {
    return classNames.filter(name => name != null).join(' ')
}

/**
 * Parse float value
 * @param rawData Raw data
 */
const parseNumber = (rawData: string | number | undefined | object): number => {
    if( rawData == null)
        return Number.NaN

    if (typeof rawData === "number")
        return rawData
        
    return parseFloat(rawData.toString())
}

/**
 * Snake name to works, 'snake_name' to 'Snake Name'
 * @param name Name text
 * @param firstOnly Only convert the first word to upper case
 */
const snakeNameToWord = (name: string, firstOnly: boolean = false) => {
    const items = name.split('_')
    if(firstOnly) {
        items[0] = formatUpperLetter(items[0])
        return items.join(' ')
    } else {
        return items.map(part => {
            return formatUpperLetter(part)
        }).join(' ')
    }
}

/**
 * Sort items
 * @param items Items
 * @param field Field
 * @param type Data type
 * @param ascending Is ascending
 */
const sortItems = (items: (ISearchItem | undefined)[], field: string, type: DataType, ascending: boolean) => {
    items.sort((item1, item2) => {
        // Null item
        if(item1 == null || item2 == null || item1.viewFlag == -1 || item1.viewFlag == -2 || item2.viewFlag == -1 || item2.viewFlag == -2)
            return 0

        const v1 = item1[field]
        const v2 = item2[field]

        // Null value
        if(v1 == null) {
            return ascending ? -1 : 1
        } else if(v2 == null) {
            return ascending ? 1 : -1
        }

        if(type == DataType.Date || type == DataType.Money || type == DataType.Number) {
            const n1: number = type == DataType.Date ? Date.parse(v1) : v1
            const n2: number = type == DataType.Date ? Date.parse(v2) : v2
            if(n1 > n2) {
                return ascending ? 1 : -1
            } else if(n1 < n2) {
                return ascending ? -1 : 1
            } else {
                return 0
            }
        } else {
            return ascending ? (v1 as string).localeCompare(v2 as string) : (v2 as string).localeCompare(v1 as string)
        }
    })
}

/**
 * Cache kind
 */
export enum CacheKind {
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
export const Utils = {
    cacheSessionData,
    cacheSessionDataGet,
    cacheSessionDataParse,
    cacheSessionString,
    detectedLanguage,
    dimensionEqual,
    formatUpperLetter,
    formDataToObject,
    getCurrentLanguage,
    getLocationKey,
    joinItems,
    mergeClasses,
    parseNumber,
    snakeNameToWord,
    sortItems
}