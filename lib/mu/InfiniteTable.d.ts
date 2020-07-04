import React from "react";
import { ListItemRendererProps, InfinitListMethods, InfiniteListScrollProps } from "../apps/InfiniteList";
import { ISearchItem, ISearchLayoutItem, ISearchResult } from "../views/ISearchResult";
import { InfiniteListSharedProps } from "../apps/InfiniteListSharedProps";
/**
 * Infinite table props
 */
export interface InfiniteTableProps extends InfiniteListSharedProps {
    /**
     * Footer renderer
     * @param props Properties
     * @param className Style class name
     * @param parentClasses Parent style classes
     */
    footerRenderer?(props: ListItemRendererProps, className: string, parentClasses: string[]): React.ReactElement;
    /**
     * Header renderer
     * @param props Properties
     * @param className Style class name
     * @param parentClasses Parent style classes
     */
    headerRenderer?(props: ListItemRendererProps, className: string, parentClasses: string[]): React.ReactElement;
    /**
     * Is hide header
     */
    hideHeader?: boolean;
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
     * @param props Properties
     * @param className Style class name
     * @param parentClasses Parent style classes
     */
    itemRenderer?(props: ListItemRendererProps, className: string, parentClasses: string[]): React.ReactElement;
    /**
     * Load items callback
     * @param page Current page
     * @param records Records to load
     * @param orderIndex Order field index
     */
    loadItems(page: number, records: number, orderIndex?: number): Promise<ISearchResult<ISearchItem>>;
    /**
     * Item click handler
     * @param event Click event
     * @param item Current item
     */
    onItemClick?(event: React.MouseEvent, item: ISearchItem | undefined): void;
    /**
     * On scroll callback
     * @param props Scroll properties
     */
    onScroll?(props: InfiniteListScrollProps): void;
    /**
     * Order field index
     */
    orderIndex?: number;
    /**
     * On scroll change callback
     * @param scroller Scroll HTML element
     * @param vertical Vertical scroll
     * @param zero Is zero scroll offset
     */
    onScrollChange?(scroller: HTMLElement, vertical: boolean, zero: boolean): void;
    /**
     * Padding, Material space unit
     */
    padding?: number;
    /**
     * Records to read onetime
     */
    records?: number;
    /**
     * Row height
     */
    rowHeight: number;
    /**
     * Selectable
     */
    selectable?: boolean;
    /**
     * Sortable
     */
    sortable?: boolean;
    /**
     * Try cache
     */
    tryCache?: boolean;
}
/**
 * Infinite table public methods
 */
export interface InfiniteTableMethods extends InfinitListMethods {
}
/**
 * Get table row class
 * @param columns Columns
 */
export declare function InfiniteTableGetRowClass(columns: ISearchLayoutItem[], selectable?: boolean): {
    display: string;
    gridTemplateColumns: string;
};
/**
 * Infinite MUI table
 */
export declare const InfiniteTable: React.ForwardRefExoticComponent<InfiniteTableProps & React.RefAttributes<InfiniteTableMethods>>;
