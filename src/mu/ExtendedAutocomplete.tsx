import React from 'react';
import {
    AutocompleteProps,
    AutocompleteRenderInputParams,
    Autocomplete
} from '@material-ui/lab';
import { InputLabelProps, TextField } from '@material-ui/core';

/**
 * Properties
 */
export type ExtendedAutocompleteProps<T = Record<string, any>[]> = Omit<
    AutocompleteProps<T, undefined, undefined, undefined>,
    'renderInput'
> & {
    /**
     * Textinput label
     */
    label?: string;

    /**
     * Input label properties
     */
    InputLabelProps?: Partial<InputLabelProps>;

    /**
     * Name
     */
    name?: string;

    /**
     * Render the input.
     *
     * @param {object} params
     * @returns {ReactNode}
     */
    renderInput?: (
        params: AutocompleteRenderInputParams
    ) => React.ReactNode | void;
};

/**
 * Extended Autocomplete
 * @param props Properties
 */
export function ExtendedAutocomplete<T>(props: ExtendedAutocompleteProps<T>) {
    // Destruct
    const {
        label,
        // eslint-disable-next-line no-shadow
        InputLabelProps,
        name,
        renderInput,
        ...rest
    } = props;

    // Merge the input's properties
    // renderInput is a callback function with well prepared 'params'
    // need to be destructured to the TextField component
    const mergeProperties = (params: AutocompleteRenderInputParams) => {
        // Merge well prepared properties, rest properties, shallow copy
        const merged = {
            label,
            name,
            ...params
        };

        // Support to merge the 'InputLabelProps' sub property collection
        if (InputLabelProps) {
            Object.assign(merged.InputLabelProps, InputLabelProps);
        }

        // Prevent autocomplete of the input field
        // https://stackoverflow.com/questions/12374442/chrome-ignores-autocomplete-off
        Object.assign(merged.inputProps, {
            autoComplete: 'new-password',
            'aria-autocomplete': 'off'
        });

        // Return
        return merged;
    };

    const renderInputLocal = (params: AutocompleteRenderInputParams) => {
        // Merge properties
        const m = mergeProperties(params);

        // Custom render
        if (renderInput) {
            const result = renderInput(m);
            if (result) return result;
        }

        return <TextField {...m} />;
    };

    // Return
    return <Autocomplete renderInput={renderInputLocal} {...rest} />;
}
