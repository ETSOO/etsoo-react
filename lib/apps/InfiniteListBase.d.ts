import React from 'react';
import InfiniteLoader from 'react-window-infinite-loader';
import { ListChildComponentProps, Layout, ListOnScrollProps, ReactElementType, ListItemKeySelector } from 'react-window';
import { InfiniteListSharedProps } from './InfiniteListSharedProps';
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
    loadMoreItems(startIndex: number, stopIndex: number): Promise<any> | null;
    /**
     * Callback to document.createElement to create the inner container element
     */
    innerElementType?: ReactElementType;
    /**
     * Sort item key
     */
    itemKey?: ListItemKeySelector;
    /**
     * Is the item loaded
     * @param index Current item index
     */
    isItemLoaded(index: number): boolean;
    /**
     * Item renderer
     * @param props Properties
     */
    itemRenderer(props: InfiniteListItemProps): React.ReactElement;
    /**
     * Item size, is item height when vertical
     */
    itemSize: number;
    /**
     * Item count
     */
    itemCount: number;
    /**
     * Horizontal or vertical layout
     */
    layout?: Layout;
    /**
     * Minimum number of rows to be loaded at a time
     */
    minimumBatchSize?: number;
    /**
     * On scroll callback
     * @param props Scroll properties
     */
    onScroll?: (props: ListOnScrollProps) => any;
    /**
     * Callback to document.createElement to create the outer container element
     */
    outerElementType?: ReactElementType;
}
/**
 * Infinite list base component
 * @param props Properties
 */
export declare const InfiniteListBase: React.ForwardRefExoticComponent<InfiniteListBaseProps & React.RefAttributes<InfiniteLoader>>;
