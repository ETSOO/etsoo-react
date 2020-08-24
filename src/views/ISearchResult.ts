import { DataTypes, Utils } from '@etsoo/shared';
/**
 * Common search layout item
 */
export interface ISearchLayoutItem {
    /**
     * Text align
     */
    align?: DataTypes.HAlignEnum;

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
     * Data display type
     */
    type: DataTypes.DisplayType;

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
 * Format layouts
 * @param layouts Layouts
 * @param callback Callback
 * @param firstOnly First letter only
 */
export const searchLayoutFormat = (
    layouts: ISearchLayoutItem[],
    callback?: SearchLayoutFormatCallback,
    firstOnly: boolean = false
) => {
    layouts.forEach((c) => {
        // Callback
        let label = callback ? callback(c.field) : c.label;

        if (label == null) {
            // Default format
            label = Utils.snakeNameToWord(c.field, firstOnly);
        }

        // Update
        Object.assign(c, { label });
    });
};

/**
 * Sort items
 * @param items Items
 * @param field Field
 * @param type Data display type
 * @param ascending Is ascending
 */
export const sortItems = (
    items: (ISearchItem | undefined)[],
    field: string,
    type: DataTypes.DisplayType,
    ascending: boolean
) => {
    items.sort((item1, item2) => {
        // Null item
        if (
            item1 == null ||
            item2 == null ||
            item1.viewFlag === -1 ||
            item1.viewFlag === -2 ||
            item2.viewFlag === -1 ||
            item2.viewFlag === -2
        ) {
            return 0;
        }

        const v1 = item1[field];
        const v2 = item2[field];

        // Null value
        if (v1 == null) {
            return ascending ? -1 : 1;
        }
        if (v2 == null) {
            return ascending ? 1 : -1;
        }

        if (
            type === DataTypes.DisplayType.Date ||
            type === DataTypes.DisplayType.Money ||
            type === DataTypes.DisplayType.Number
        ) {
            const n1: number =
                type === DataTypes.DisplayType.Date ? Date.parse(v1) : v1;
            const n2: number =
                type === DataTypes.DisplayType.Date ? Date.parse(v2) : v2;
            if (n1 > n2) {
                return ascending ? 1 : -1;
            }
            if (n1 < n2) {
                return ascending ? -1 : 1;
            }
            return 0;
        }

        return ascending
            ? (v1 as string).localeCompare(v2 as string)
            : (v2 as string).localeCompare(v1 as string);
    });
};
