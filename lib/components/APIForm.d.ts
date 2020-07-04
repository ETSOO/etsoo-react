import React from "react";
import * as Yup from 'yup';
/**
 * API form properties
 */
export interface APIFormProps {
    /**
     * Style class name
     */
    className?: string;
    /**
     * On submit event
     */
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
}
/**
 * API form reference interface
 */
export interface APIFormRef {
    changeHandler(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}
export declare const APIForm: React.ForwardRefExoticComponent<APIFormProps & {
    children?: React.ReactNode;
} & React.RefAttributes<APIFormRef>>;
/**
 * API form validator state field
 */
interface APIFormValidatorStateField {
    /**
     * Is error state
     */
    error: boolean;
    /**
     * state text
     */
    text: string;
}
/**
 * API form validator state fields
 */
interface APIFormValidatorStateFields {
    [key: string]: APIFormValidatorStateField;
}
/**
 * API form validator state
 */
export interface APIFormValidatorState {
    /**
     * State fields
     */
    fields: APIFormValidatorStateFields;
    /**
     * Is error state
     * @param field Field name
     */
    error(field: string): boolean;
    /**
     * State text
     * @param field Field name
     */
    text(field: string): string;
}
/**
 * API form validator
 */
export declare class APIFormValidator {
    /**
     * API form reference
     */
    ref: React.RefObject<APIFormRef>;
    /**
     * Validation schemas
     */
    schemas: Yup.ObjectSchema<object>;
    /**
     * Validation state
     */
    state: APIFormValidatorState;
    /**
     * Validation sate update
     */
    private updateState;
    /**
     * Constructor
     * @param schemas Validation schemas
     */
    constructor(schemas: Yup.ObjectSchema<object>);
    /**
     * Blur event handler
     * Array function to hold this
     * @param event Focus event
     */
    blurHandler: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    /**
     * Change event handler
     * Array function to hold this
     * @param event Change event
     */
    changeHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
export {};
