/**
 * Current detected language
 */
export const detectedLanguage = (() => {
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
 * Get the available language item
 * @param items Available languages
 * @param language Detected language
 */
export function getCurrentLanguage(items, language) {
    return items.find(item => item.name === language) || items[0];
}
