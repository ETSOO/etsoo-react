import React from 'react';
import { ISearchItem, ISearchResult, ISearchLayoutItem } from '../views/ISearchResult';
import { InfiniteListItemProps } from './InfiniteListBase';
import { InfiniteListSharedProps } from './InfiniteListSharedProps';
import { DataType } from '../api/DataType';
/**
 * List item renderer properties
 */
export interface ListItemRendererProps extends InfiniteListItemProps {
    /**
     * Data
     */
    data: ISearchItem | undefined;
    /**
     * Layout
     */
    layouts?: ISearchLayoutItem[];
    /**
     * Is end of the list
     */
    end: boolean;
    /**
     * Other custom data
     */
    other?: any;
    /**
     * Total records
     */
    records?: number;
}
/**
 * Infinite list on scroll callback properties
 */
export interface InfiniteListScrollProps {
    /**
     * Is vertical
     */
    vertical: boolean;
    /**
     * Direction
     */
    direction: 'forward' | 'backward';
    /**
     * Offset
     */
    offset: number;
    /**
     * Scroller
     */
    scroller: HTMLElement;
}
/**
 * Infinite list props
 */
export interface InfiniteListProps extends InfiniteListSharedProps {
    /**
     * Has header item
     */
    hasHeader?: boolean;
    /**
     * Has footer item
     */
    hasFooter?: boolean;
    /**
     * Is horizontal layout
     */
    horizontal?: boolean;
    /**
     * Id of the component
     */
    id?: string;
    /**
     * Inner container class name
     */
    innerClassName?: string;
    /**
     * Item unit property name, default is id
     */
    itemKey?: string;
    /**
     * Item renderer
     * @param props
     */
    itemRenderer(props: ListItemRendererProps): React.ReactElement;
    /**
     * Item size (height)
     */
    itemSize: number;
    /**
     * Load items callback
     * @param page Current page
     * @param records Records to load
     * @param orderIndex Order field index
     */
    loadItems(page: number, records: number, orderIndex?: number): Promise<ISearchResult<ISearchItem>>;
    /**
     * Name of the component
     */
    name?: string;
    /**
     * On scroll callback
     * @param props Scroll properties
     */
    onScroll?(props: InfiniteListScrollProps): void;
    /**
     * On scroll change callback
     * @param scroller Scroll HTML element
     * @param vertical Vertical scroll
     * @param zero Is zero scroll offset
     */
    onScrollChange?(scroller: HTMLElement, vertical: boolean, zero: boolean): void;
    /**
     * Order field index
     */
    orderIndex?: number;
    /**
     * Padding px
     */
    padding?: number;
    /**
     * Records to read onetime
     */
    records?: number;
    /**
     * Try cache
     */
    tryCache?: boolean;
}
/**
 * Infinite list public methods
 */
export interface InfinitListMethods {
    /**
     * Clear the list cache
     */
    clearCache(): void;
    /**
     * Get the index item
     * @param index Item index
     */
    getItem(index: number): ISearchItem | undefined;
    /**
     * Reset all data and rerenderer
     */
    reset(): void;
    /**
     * Select all items
     * @param selected Selected
     */
    selectAll(selected: boolean): void;
    /**
     * Select the index item
     * @param index Target index
     */
    selectItem(index: number): ISearchItem | undefined;
    /**
     * Sort data
     * @param field Field name
     * @param type Data type
     * @param index Sort field index
     */
    sort(field: string, type: DataType, index: number): void;
}
/**
 * Infinite list component
 * @param pros Properties
 */
export declare const InfiniteList: React.ForwardRefExoticComponent<InfiniteListProps & React.RefAttributes<InfinitListMethods>>;
