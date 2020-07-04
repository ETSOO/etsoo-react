import React, { FormEventHandler } from 'react';
/**
 * Styled form properties
 */
export interface StyledFormProps {
    /**
     * Form auto complete
     */
    autoComplete?: 'on' | 'off';
    /**
     * Hidden of the form
     */
    hidden?: boolean;
    /**
     * On submit event handler
     */
    onSubmit?: FormEventHandler;
}
/**
 * Styled form
 * @param props Properties
 */
export declare const StyledForm: React.ForwardRefExoticComponent<StyledFormProps & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLFormElement>>;
