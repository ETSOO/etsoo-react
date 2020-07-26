import React from 'react';
interface ICustomStyle {
    /**
     * Focus width
     */
    focusWidth?: string;
    /**
     * Input width
     */
    width?: string;
}
/**
 * Search bar properties interface
 */
export interface SearchBarProps extends ICustomStyle {
    /**
     * Input blur event handler
     */
    onBlur?: React.FocusEventHandler;
    /**
     * Input change event handler
     */
    onChange?: React.ChangeEventHandler;
    /**
     * Input delay change event handler
     */
    onDelayChange?: React.ChangeEventHandler;
    /**
     * Input focus event handler
     */
    onFocus?: React.FocusEventHandler;
    /**
     * placeholder for the input
     */
    placeholder?: string;
}
/**
 * Search bar
 * @param props Properties
 */
export declare function SearchBar(props: SearchBarProps): JSX.Element;
export {};
