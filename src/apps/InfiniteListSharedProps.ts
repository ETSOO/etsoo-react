import { ListOnScrollProps } from "react-window"

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
     * Inital scroll offset, scrollTop or scrollLeft
     */
    initialScrollOffset?: number

    /**
     * On scroll callback
     */
    onScroll?: (props: ListOnScrollProps) => any

    /**
     * Width px
     */
    width?: number | string
}