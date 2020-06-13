import React from "react"
import InfiniteLoader from "react-window-infinite-loader"
import { FixedSizeList, ListChildComponentProps, Layout, ListOnScrollProps, ReactElementType, ListItemKeySelector } from "react-window"
import { InfiniteListSharedProps } from "./InfiniteListSharedProps"

/**
 * Infinite list base component item properties
 */
export interface InfiniteListItemProps extends ListChildComponentProps {

}

/**
 * Infinite list base component properties
 */
export interface InfiniteListBaseProps extends InfiniteListSharedProps {
    /**
     * Load more items
     * @param startIndex Current start index
     * @param stopIndex Current stop index
     */
    loadMoreItems(startIndex: number, stopIndex: number): Promise<any> | null

    /**
     * Callback to document.createElement to create the inner container element
     */
    innerElementType?: ReactElementType

    /**
     * Sort item key
     */
    itemKey?: ListItemKeySelector

    /**
     * Is the item loaded
     * @param index Current item index
     */
    isItemLoaded(index: number): boolean

    /**
     * Item renderer
     * @param props Properties
     */
    itemRenderer(props: InfiniteListItemProps): React.ReactElement

    /**
     * Item size, is item height when vertical
     */
    itemSize: number

    /**
     * Item count
     */
    itemCount: number

    /**
     * Horizontal or vertical layout
     */
    layout?: Layout

    /**
     * Minimum number of rows to be loaded at a time
     */
    minimumBatchSize?: number

    /**
     * On scroll callback
     * @param props Scroll properties
     */
    onScroll?: (props: ListOnScrollProps) => any

    /**
     * Callback to document.createElement to create the outer container element
     */
    outerElementType?: ReactElementType
}

/**
 * Infinite list base component
 * @param props Properties
 */
export const InfiniteListBase = React.forwardRef<InfiniteLoader, InfiniteListBaseProps>(({ height, isItemLoaded, itemCount, loadMoreItems, minimumBatchSize, itemRenderer, threshold, width, ...rest }, ref) => {
    if(height == null || width == null)
        return <></>

    return (
        <InfiniteLoader loadMoreItems={loadMoreItems} minimumBatchSize={minimumBatchSize} isItemLoaded={isItemLoaded} itemCount={itemCount} ref={ref} threshold={threshold}>
            {
                ({ onItemsRendered, ref }) => (
                    <FixedSizeList
                        onItemsRendered={onItemsRendered}
                        ref={ref}

                        height={height}
                        itemCount={itemCount}
                        width={width}
                        {...rest}
                    >{itemRenderer}</FixedSizeList>
                )
            }
        </InfiniteLoader>
    )
})