import { ILanguageItem } from "./IApiSettings"

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
 * Utils
 */
export const Utils = {
    detectedLanguage,
    dimensionEqual,
    formatUpperLetter,
    formDataToObject,
    getCurrentLanguage,
    mergeClasses,
    parseNumber,
    snakeNameToWord
}