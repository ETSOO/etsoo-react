import React from 'react';
import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeGrid } from 'react-window';
/**
 * Infinite grid state class
 */
class InfiniteGridState {
    /**
     * Constructor
     * @param items Init items
     */
    constructor(items) {
        this.items = items;
        this.loaded = false;
        this.page = 0;
    }
}
/**
 * Infinite grid component
 * @param pros Properties
 */
export function InfiniteGrid(props) {
    // Items state
    const [state, updateState] = React.useState(new InfiniteGridState([]));
    // Determine the index is ready
    const isItemLoaded = (index) => {
        return state.loaded || index < state.items.length;
    };
    // Load more items
    const loadMoreItems = async (startIndex, stopIndex) => {
        // Loaded then return
        if (state.loaded)
            return;
        // Read next page
        const page = state.page + 1;
        const items = (await props.loadItems(page, props.records)) || [];
        // Add to the collection
        state.items.push(...items);
        // New state
        const newState = new InfiniteGridState(state.items);
        newState.page = page;
        newState.loaded = items.length < props.records;
        // Update
        updateState(newState);
    };
    // Add 1 to the length to indicate more data is available
    const itemCount = state.items.length + (state.loaded ? 0 : 1);
    // Calcuate row count
    const rowCount = Math.ceil(itemCount / props.columnCount);
    // Default column width
    const columnWidth = props.columnWidth || ((props.width || 640) / props.columnCount);
    // Default width
    const width = props.width || (props.columnCount * columnWidth);
    // Direction
    const direction = props.rightToLeft ? 'rtl' : 'ltr';
    // Render an item or a loading indicator
    const itemRenderer = (lp) => {
        const index = lp.rowIndex * props.columnCount + lp.columnIndex;
        const newProps = {
            columnIndex: lp.columnIndex,
            end: (index + 1 == itemCount),
            rowIndex: lp.rowIndex,
            index: index,
            data: state.items[index],
            isScrolling: lp.isScrolling,
            style: lp.style,
        };
        return props.itemRenderer(newProps);
    };
    // Item key
    const itemKey = ({ columnIndex, rowIndex, data }) => {
        const index = rowIndex * props.columnCount + columnIndex;
        const field = props.itemKey || 'id';
        if (data == null || data[field] == null)
            return index;
        return data[field];
    };
    return (React.createElement(InfiniteLoader, { isItemLoaded: isItemLoaded, itemCount: itemCount, loadMoreItems: loadMoreItems, minimumBatchSize: props.records, threshold: props.records + 5 }, ({ onItemsRendered, ref }) => (React.createElement(FixedSizeGrid, { className: props.className, columnCount: props.columnCount, columnWidth: columnWidth, direction: direction, height: props.height, initialScrollLeft: props.initialScrollLeft, initialScrollTop: props.initialScrollTop, itemKey: itemKey, onScroll: props.onScroll, onItemsRendered: ({ visibleRowStartIndex, visibleRowStopIndex, overscanRowStopIndex, overscanRowStartIndex, }) => {
            onItemsRendered({
                overscanStartIndex: overscanRowStartIndex,
                overscanStopIndex: overscanRowStopIndex,
                visibleStartIndex: visibleRowStartIndex,
                visibleStopIndex: visibleRowStopIndex,
            });
        }, rowCount: rowCount, ref: ref, rowHeight: props.rowHeight, width: width }, itemRenderer))));
}
