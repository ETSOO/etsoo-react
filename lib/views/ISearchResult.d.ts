import { Align } from "../api/Align";
import { DataType } from "../api/DataType";
/**
 * Common search layout item
 */
export interface ISearchLayoutItem {
    /**
     * Text align
     */
    align?: Align;
    /**
     * Data field
     */
    field: string;
    /**
     * Label
     */
    label?: string;
    /**
     * Sort field index
     */
    sort?: number;
    /**
     * Data type
     */
    type: DataType;
    /**
     * Width
     */
    width?: number;
    /**
     * Max width
     */
    widthmax?: number;
    /**
     * Min width
     */
    widthmin?: number;
}
/**
 * Common search item
 */
export interface ISearchItem {
    /**
     * Loaded or not
     */
    loading?: boolean;
    /**
     * View flag value
     */
    viewFlag?: number;
    /**
     * Selected
     */
    selected?: boolean;
    /**
     * Key index
     */
    [key: string]: any;
}
/**
 * Common search result
 */
export interface ISearchResult<T extends ISearchItem> {
    /**
     * Custom data
     */
    data?: any;
    /**
     * Items
     */
    items: T[];
    /**
     * Layout
     */
    layouts?: ISearchLayoutItem[];
    /**
     * Total records
     */
    records?: number;
}
/**
 * Format layouts callback interface
 */
interface SearchLayoutFormatCallback {
    (field: string): string | null;
}
/**
 * From enum to string
 * @param align Align
 */
export declare const searchLayoutAlign: (align?: Align | undefined) => "left" | "center" | "right" | undefined;
/**
 * Format layouts
 * @param layouts Layouts
 * @param callback Callback
 * @param firstOnly First letter only
 */
export declare const searchLayoutFormat: (layouts: ISearchLayoutItem[], callback?: SearchLayoutFormatCallback | undefined, firstOnly?: boolean) => void;
export {};
