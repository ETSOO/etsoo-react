import React from "react";
/**
 * List panel properties
 */
export interface ListPanelProps {
    /**
     * Style class name
     */
    className?: string;
    /**
     * Top right more element
     */
    moreElement?: React.ReactElement;
    /**
     * Footer element
     */
    footerElement?: React.ReactElement;
    /**
     * List items
     */
    items: any[];
    /**
     * List item renderer
     */
    itemRenderer(item: any, index: number): React.ReactElement;
    /**
     * Title
     */
    title: string;
}
/**
 * List panel
 * @param props Properties
 */
export declare function ListPanel({ className, footerElement, items, itemRenderer, moreElement, title, ...rest }: ListPanelProps): JSX.Element;
