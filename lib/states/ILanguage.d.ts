/**
 * Language label
 * Indexable type
 */
export interface LanguageLabel {
    [key: string]: string;
}
/**
 * Language state
 */
export interface ILanguage {
    /**
     * Global labels
     */
    labels: LanguageLabel;
    /**
     * Current language name
     */
    name: string;
}
