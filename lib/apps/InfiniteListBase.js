import React from 'react';
import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeList } from 'react-window';
/**
 * Infinite list base component
 * @param props Properties
 */
export const InfiniteListBase = React.forwardRef((props, ref) => {
    // Destruct properties
    const { height, isItemLoaded, itemCount, loadMoreItems, minimumBatchSize, itemRenderer, threshold, width, ...rest } = props;
    // No size return a blank element
    if (height == null || width == null) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement(InfiniteLoader, { loadMoreItems: loadMoreItems, minimumBatchSize: minimumBatchSize, isItemLoaded: isItemLoaded, itemCount: itemCount, ref: ref, threshold: threshold }, ({ onItemsRendered, ref: listRef }) => (React.createElement(FixedSizeList, Object.assign({ onItemsRendered: onItemsRendered, ref: listRef, height: height, itemCount: itemCount, width: width }, rest), itemRenderer))));
});
