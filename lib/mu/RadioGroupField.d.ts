import React from 'react';
import { RadioGroupProps } from '@material-ui/core';
/**
 * Radio group item interface
 */
export interface RadioGroupFieldItem {
    /**
     * Label of the item
     */
    label: string;
    /**
     * Value of the item
     */
    value: unknown;
}
/**
 * Radio group field properties
 */
export interface RadioGroupFieldProps extends RadioGroupProps {
    /**
     * If `true`, the label should be displayed in an error state
     */
    error?: boolean;
    /**
     * Error class name
     */
    errorClassName?: string;
    /**
     * The helper text content
     */
    helperText?: React.ReactNode;
    /**
     * Radio items
     */
    items: RadioGroupFieldItem[];
    /**
     * Label for the field
     */
    label?: string;
    /**
     * If `true`, the label will indicate that the input is required.
     */
    required?: boolean;
    /**
     * List class name
     */
    listClassName?: string;
    /**
     * Title class name
     */
    titleClassName?: string;
}
/**
 * Radio group field
 */
export declare function RadioGroupField(props: RadioGroupFieldProps): JSX.Element;
