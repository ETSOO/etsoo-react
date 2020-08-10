import React, { ComponentType } from 'react';
import InfiniteLoader from 'react-window-infinite-loader';
import {
    FixedSizeGrid,
    GridOnScrollProps,
    CSSDirection,
    GridItemKeySelector,
    GridChildComponentProps
} from 'react-window';
import { ISearchItem } from '../views/ISearchResult';
import { IDynamicData } from '../api/IDynamicData';

/**
 * List item renderer properties
 */
export interface GridItemRendererProps extends GridChildComponentProps {
    /**
     * Data
     */
    data: IDynamicData;

    /**
     * Is end of the list
     */
    end: boolean;

    /**
     * Current index
     */
    index: number;
}

/**
 * Infinite grid props
 */
export interface InfiniteGridProps {
    /**
     * Class name
     */
    className?: string;

    /**
     * Column count
     */
    columnCount: number;

    /**
     * Column width
     */
    columnWidth?: number;

    /**
     * Text direction is right to left
     */
    rightToLeft?: boolean;

    /**
     * Height
     */
    height: number;

    /**
     * Horizontal scroll offset for initial render.
     */
    initialScrollLeft?: number;

    /**
     * Vertical scroll offset for initial render.
     */
    initialScrollTop?: number;

    /**
     * Item unit property name, default is id
     */
    itemKey?: string;

    /**
     * Item renderer
     * @param props Properties
     */
    itemRenderer(
        props: GridItemRendererProps
    ): React.ReactElement<GridItemRendererProps>;

    /**
     * Load items callback
     */
    loadItems(page: number, records: number): Promise<ISearchItem[]>;

    /**
     * On scroll callback
     */
    onScroll?: (props: GridOnScrollProps) => any;

    /**
     * Row height
     */
    rowHeight: number;

    /**
     * Records to read onetime
     */
    records: number;

    /**
     * Width
     */
    width?: number;
}

/**
 * Infinite grid state class
 */
class InfiniteGridState {
    /**
     * List items
     */
    items: ISearchItem[];

    /**
     * All data is loaded
     */
    loaded: boolean;

    /**
     * Current page
     */
    page: number;

    /**
     * Constructor
     * @param items Init items
     */
    constructor(items: ISearchItem[]) {
        this.items = items;
        this.loaded = false;
        this.page = 0;
    }
}

/**
 * Infinite grid component
 * @param pros Properties
 */
export function InfiniteGrid(props: InfiniteGridProps) {
    // Destruct properties
    const { columnCount, columnWidth, rightToLeft, records, width } = props;

    // Items state
    const [state, updateState] = React.useState(new InfiniteGridState([]));

    // Determine the index is ready
    const isItemLoaded = (index: number) =>
        state.loaded || index < state.items.length;

    // Load more items
    const loadMoreItems = async () => {
        // Loaded then return
        if (state.loaded) {
            return;
        }

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
    const rowCount = Math.ceil(itemCount / columnCount);

    // Default column width
    const localColumnWidth = columnWidth || (width || 640) / columnCount;

    // Default width
    const localWidth = width || columnCount * localColumnWidth;

    // Direction
    const direction: CSSDirection = rightToLeft ? 'rtl' : 'ltr';

    // Render an item or a loading indicator
    const itemRenderer: ComponentType<GridChildComponentProps> = (lp) => {
        const index = lp.rowIndex * columnCount + lp.columnIndex;
        const newProps: GridItemRendererProps = {
            columnIndex: lp.columnIndex,
            end: index + 1 === itemCount,
            rowIndex: lp.rowIndex,
            index,
            data: state.items[index],
            isScrolling: lp.isScrolling,
            style: lp.style
        };
        return props.itemRenderer(newProps);
    };

    // Item key
    const itemKey: GridItemKeySelector = ({ columnIndex, rowIndex, data }) => {
        const index = rowIndex * columnCount + columnIndex;
        const field = props.itemKey || 'id';
        if (data == null || data[field] == null) {
            return index;
        }

        return data[field];
    };

    return (
        <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
            minimumBatchSize={records}
            threshold={records + 5}
        >
            {({ onItemsRendered, ref }) => (
                <FixedSizeGrid
                    className={props.className}
                    columnCount={columnCount}
                    columnWidth={localColumnWidth}
                    direction={direction}
                    height={props.height}
                    initialScrollLeft={props.initialScrollLeft}
                    initialScrollTop={props.initialScrollTop}
                    itemKey={itemKey}
                    onScroll={props.onScroll}
                    onItemsRendered={({
                        visibleRowStartIndex,
                        visibleRowStopIndex,
                        overscanRowStopIndex,
                        overscanRowStartIndex
                    }) => {
                        onItemsRendered({
                            overscanStartIndex: overscanRowStartIndex,
                            overscanStopIndex: overscanRowStopIndex,
                            visibleStartIndex: visibleRowStartIndex,
                            visibleStopIndex: visibleRowStopIndex
                        });
                    }}
                    rowCount={rowCount}
                    ref={ref}
                    rowHeight={props.rowHeight}
                    width={localWidth}
                >
                    {itemRenderer}
                </FixedSizeGrid>
            )}
        </InfiniteLoader>
    );
}
