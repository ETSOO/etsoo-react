import { ILanguageItem } from '../api/IApiSettings';
/**
 * Language chooser properties
 */
export interface LanguageChooserProps {
    /**
     * Style class name
     */
    className?: string;
    /**
     * Close event
     */
    onClose?(item?: ILanguageItem): void;
    /**
     * Current selected language
     */
    selectedValue?: string;
    /**
     * Title
     */
    title?: string;
    /**
     * Items
     */
    items: ILanguageItem[];
}
/**
 * Language chooser component
 * @param props Properties
 */
export declare function LanguageChooser(props: LanguageChooserProps): JSX.Element;
