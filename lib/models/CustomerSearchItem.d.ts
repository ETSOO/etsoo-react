/**
 * Customer search default item
 */
export interface CustomerSearchItem {
    /**
     * Birth date
     */
    readonly birth_date?: Date;
    /**
     * Cid
     */
    readonly cid?: string;
    /**
     * Country
     */
    readonly country?: string;
    /**
     * Description
     */
    readonly description?: string;
    /**
     * Entry date
     */
    readonly entry_date?: Date;
    /**
     * Id
     */
    readonly id: number;
    /**
     * Name
     */
    readonly name: string;
    /**
     * Region
     */
    readonly region?: string;
}
