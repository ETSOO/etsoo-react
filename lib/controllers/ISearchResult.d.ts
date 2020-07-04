/**
 * Common search layout item
 */
export interface ISearchLayoutItem {
    /**
     * Data field
     */
    field: string;
    /**
     * Label
     */
    label?: string;
    /**
     * Width
     */
    width?: number;
}
/**
 * Common search result
 */
export interface ISearchResult<T> {
    /**
     * Items
     */
    items: T[];
    /**
     * Layout
     */
    layouts: ISearchLayoutItem[];
    /**
     * Total records
     */
    totalRecords?: number;
}
