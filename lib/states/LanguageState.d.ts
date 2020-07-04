/// <reference types="react" />
import { IAction } from "./IState";
import { ILanguageItem } from "../api/IApiSettings";
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
export declare function LanguageReducer(state: ILanguage, action: LanguageAction): ILanguage;
/**
 * Creator for language context and provider globally, not inside a component to avoid problem:
 * Cannot update a component (`provider`) while rendering a different component (`Login`)
 * @param language Current language
 */
export declare const LanguageStateCreator: (languageItem?: ILanguageItem | undefined) => {
    context: import("react").Context<import("./IState").IUpdate<ILanguage, LanguageAction>>;
    provider: import("react").FunctionComponent<{}>;
};
