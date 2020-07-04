import React from "react";
import { ListItemRendererProps } from "../apps/InfiniteList";
import { LanguageLabel } from "../states/LanguageState";
import { ISearchResult, ISearchItem } from "../views/ISearchResult";
import { IDynamicData } from "../api/IDynamicData";
import { IClickAction } from "../api/IClickAction";
/**
 * Search page properties
 */
export interface SearchPageProps {
    /**
     * Style class name
     */
    className?: string;
    /**
     * Has footer
     */
    hasFooter?: boolean;
    /**
     * Height
     */
    height: number;
    /**
     * Item renderer
     * @param props Properties
     * @param className Style class name
     * @param parentClasses Parent style classes
     */
    itemRenderer?(props: ListItemRendererProps, className: string, parentClasses: string[]): React.ReactElement;
    /**
     * Labels
     */
    labels?: LanguageLabel;
    /**
     * Load items callback
     * @param page Current page
     * @param records Records to load
     * @param orderIndex Order field index
     */
    loadItems(page: number, records: number, orderIndex?: number): Promise<ISearchResult<ISearchItem>>;
    /**
     * More actions
     */
    moreActions?: IClickAction[];
    /**
     * Add click handler
     */
    onAddClick: React.MouseEventHandler;
    /**
     * Item click handler
     * @param event Click event
     * @param item Current item
     */
    onItemClick?(event: React.MouseEvent, item: ISearchItem | undefined): void;
    /**
     * Padding (spacing)
     */
    padding: number;
    /**
     * Row height
     */
    rowHeight?: number;
    /**
     * Search properties
     */
    searchProps: IDynamicData;
    /**
     * Sortable
     */
    sortable?: boolean;
    /**
     * Try cache
     */
    tryCache?: boolean;
    /**
     * Width
     */
    width: number;
}
/**
 * Search page
 */
export declare function SearchPage({ className, hasFooter, height, moreActions, itemRenderer, labels, loadItems, onAddClick, onItemClick, padding, rowHeight, searchProps, sortable, tryCache, width }: SearchPageProps): JSX.Element;
