import React from 'react';
import { IClickAction } from '../api/IClickAction';
/**
 * Search page fabs methods
 */
export interface SearchPageFabsMethods {
    /**
     * Scroll change
     * @param visible Is visible
     */
    scollChange(visible: boolean): void;
}
/**
 * Search page fabs properties
 */
export interface SearchPageFabsProps {
    /**
     * Bottom position
     */
    bottom?: number;
    /**
     * More actions
     */
    moreActions?: IClickAction[];
    /**
     * Add button click handler
     */
    onAddClick?: React.MouseEventHandler;
    /**
     * Go top button click handler
     */
    onGoTopClick?: React.MouseEventHandler;
    /**
     * Right position
     */
    right?: number;
}
/**
 * Search page fabs of 'Go top', 'Add', and 'More' functions
 */
export declare const SearchPageFabs: React.ForwardRefExoticComponent<SearchPageFabsProps & React.RefAttributes<SearchPageFabsMethods>>;
