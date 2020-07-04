import { ILanguage, LanguageLabel } from "./ILanguage";
/**
 * Language action to manage language and labels
 */
export declare type LanguageAction = {
    /**
     * Language cid, like 'zh-CN'
     */
    name: string;
    /**
     * Labels of the language
     */
    labels: LanguageLabel;
};
/**
 * Language reducer
 * @param state State
 * @param action Action
 */
export declare function LanguageReducer(state?: ILanguage, action?: LanguageAction): ILanguage | undefined;
