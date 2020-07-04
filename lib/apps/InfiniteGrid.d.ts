import React from 'react';
import { ISearchItem } from '../views/ISearchResult';
import { GridOnScrollProps, GridChildComponentProps } from 'react-window';
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
     * @param props
     */
    itemRenderer(props: GridItemRendererProps): React.ReactElement<GridItemRendererProps>;
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
 * Infinite grid component
 * @param pros Properties
 */
export declare function InfiniteGrid(props: InfiniteGridProps): JSX.Element;
