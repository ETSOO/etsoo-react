/**
 * Tiplist model
 */
export interface TiplistModel {
    /**
     * Id
     */
    id?: number | string;

    /**
     * Id array
     */
    ids?: (number | string)[];

    /**
     * Hide id
     */
    hideId?: number | string;

    /**
     * Hide ids array
     */
    hideIds?: (number | string)[];

    /**
     * Records to read
     */
    records?: number;

    /**
     * Search keyword
     */
    sc?: string;
}
