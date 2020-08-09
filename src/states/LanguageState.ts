import { IAction } from './IState';
import { CreateState } from './CreateState';
import { ILanguageItem } from '../api/IApiSettings';

/**
 * Language label, simple i18n solution
 * For premium solution: https://www.i18next.com/
 * Indexable type
 */
export interface LanguageLabel {
    readonly [key: string]: string;
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

/**
 * Language action to manage language and labels
 */
export interface LanguageAction extends IAction {
    /**
     * Labels of the language
     */
    labels: LanguageLabel;

    /**
     * Language cid, like 'zh-CN'
     */
    name: string;
}

/**
 * Language reducer
 * @param state State
 * @param action Action
 */
export function LanguageReducer(
    state: ILanguage,
    action: LanguageAction
): ILanguage {
    if (state.name === action.name) {
        return state;
    }

    if (action.name) {
        return { ...state, ...action };
    }

    return state;
}

/**
 * Creator for language context and provider globally, not inside a component to avoid problem:
 * Cannot update a component (`provider`) while rendering a different component (`Login`)
 * @param language Current language
 */
export const LanguageStateCreator = (languageItem?: ILanguageItem) => {
    // Default
    const defaultLanguageItem: ILanguage =
        languageItem == null
            ? ({} as ILanguage)
            : { name: languageItem.name, labels: languageItem.labels };

    // Act
    return CreateState(LanguageReducer, defaultLanguageItem);
};
