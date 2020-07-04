import { DataType } from "./DataType";
/**
 * Apply mixins, official suggested method
 * https://www.typescriptlang.org/docs/handbook/mixins.html#understanding-the-sample
 * @param derivedCtor Mixin target class
 * @param baseCtors Mixin base classes
 */
const applyMixins = (derivedCtor, baseCtors) => {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            if (name !== 'constructor') {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        });
    });
};
/**
 * Cache session data
 * @param data Data
 * @param key Key
 */
const cacheSessionData = (data, key) => {
    cacheSessionString(JSON.stringify(data), key);
};
/**
 * Get cache session data
 * @param key Key
 */
const cacheSessionDataGet = (key) => {
    // Is supported
    if (window.sessionStorage) {
        return window.sessionStorage.getItem(key);
    }
    else {
        return undefined;
    }
};
/**
 * Cache session data parse to specific type
 * @param key Key
 */
const cacheSessionDataParse = (key) => {
    // Data
    const data = cacheSessionDataGet(key);
    // Parse data type
    if (data)
        return JSON.parse(data);
};
/**
 * Cache session data
 * @param data Data
 * @param key Key
 */
const cacheSessionString = (data, key) => {
    // Is supported
    if (window.sessionStorage) {
        window.sessionStorage.setItem(key, data);
    }
};
/**
 * Current detected language
 */
const detectedLanguage = (() => {
    // URL first, then local storage
    let language;
    try {
        language = new URL(location.href).searchParams.get('lang') || localStorage.getItem('lang');
    }
    catch (_a) {
        language = null;
    }
    // Browser detected
    if (language == null)
        language = (navigator.languages && navigator.languages[0]) || navigator.language;
    // Return
    return language;
})();
/**
 * Is two dimensions equal
 * @param d1 Dimension 1
 * @param d2 Dimension 2
 */
const dimensionEqual = (d1, d2) => {
    if (d1 == null && d2 == null)
        return true;
    if (d1 == null || d2 == null)
        return false;
    if (d1.left == d2.left && d1.top == d2.top && d1.right == d2.right && d1.bottom == d2.bottom)
        return true;
    return false;
};
/**
 * Format word's first letter to upper case
 * @param word Word
 */
const formatUpperLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};
/**
 * Form data to object
 * @param formData Form data
 */
const formDataToObject = (formData) => {
    return Object.fromEntries(formData);
};
/**
 * Get the available language item
 * @param items Available languages
 * @param language Detected language
 */
const getCurrentLanguage = (items, language) => {
    if (items.length == 0)
        return undefined;
    return (items.find(item => item.name === language) || items[0]).name;
};
/**
 * Get an unique key combined with current URL
 * @param key Key
 */
const getLocationKey = (key) => {
    return window.location.href + ':' + key;
};
/**
 * Join items as a string
 * @param items Items
 */
const joinItems = (...items) => {
    return items.filter(item => item != null).join(', ');
};
/**
 * Merge class names
 * @param classNames Class names
 */
const mergeClasses = (...classNames) => {
    return classNames.filter(name => name != null).join(' ');
};
/**
 * Parse float value
 * @param rawData Raw data
 */
const parseNumber = (rawData) => {
    if (rawData == null)
        return Number.NaN;
    if (typeof rawData === "number")
        return rawData;
    return parseFloat(rawData.toString());
};
/**
 * Snake name to works, 'snake_name' to 'Snake Name'
 * @param name Name text
 * @param firstOnly Only convert the first word to upper case
 */
const snakeNameToWord = (name, firstOnly = false) => {
    const items = name.split('_');
    if (firstOnly) {
        items[0] = formatUpperLetter(items[0]);
        return items.join(' ');
    }
    else {
        return items.map(part => {
            return formatUpperLetter(part);
        }).join(' ');
    }
};
/**
 * Sort items
 * @param items Items
 * @param field Field
 * @param type Data type
 * @param ascending Is ascending
 */
const sortItems = (items, field, type, ascending) => {
    items.sort((item1, item2) => {
        // Null item
        if (item1 == null || item2 == null || item1.viewFlag == -1 || item1.viewFlag == -2 || item2.viewFlag == -1 || item2.viewFlag == -2)
            return 0;
        const v1 = item1[field];
        const v2 = item2[field];
        // Null value
        if (v1 == null) {
            return ascending ? -1 : 1;
        }
        else if (v2 == null) {
            return ascending ? 1 : -1;
        }
        if (type == DataType.Date || type == DataType.Money || type == DataType.Number) {
            const n1 = type == DataType.Date ? Date.parse(v1) : v1;
            const n2 = type == DataType.Date ? Date.parse(v2) : v2;
            if (n1 > n2) {
                return ascending ? 1 : -1;
            }
            else if (n1 < n2) {
                return ascending ? -1 : 1;
            }
            else {
                return 0;
            }
        }
        else {
            return ascending ? v1.localeCompare(v2) : v2.localeCompare(v1);
        }
    });
};
/**
 * Cache kind
 */
export var CacheKind;
(function (CacheKind) {
    /**
     * Router pop action only
     */
    CacheKind[CacheKind["PopOnly"] = 1] = "PopOnly";
    /**
     * Cache in a minute
     */
    CacheKind[CacheKind["InMinute"] = 2] = "InMinute";
    /**
     * During the session
     */
    CacheKind[CacheKind["Session"] = 4] = "Session";
})(CacheKind || (CacheKind = {}));
/**
 * Utils
 */
export const Utils = {
    applyMixins,
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
};
