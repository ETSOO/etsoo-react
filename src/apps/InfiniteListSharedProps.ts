/**
 * Infinite list base properties
 */
export interface InfiniteListSharedProps {
    /**
     * Class name
     */
    className?: string

    /**
     * Height
     */
    height?: number

    /**
     * Threshold at which to pre-fetch data; defaults to 15
     */
    threshold?: number

    /**
     * Width px
     */
    width?: number | string
}
