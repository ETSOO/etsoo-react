import React from 'react';
import {
    AutocompleteProps,
    AutocompleteRenderInputParams,
    Autocomplete,
    Value,
    AutocompleteChangeReason,
    AutocompleteChangeDetails
} from '@material-ui/lab';
import { InputLabelProps, TextField } from '@material-ui/core';
import { DataTypes } from '@etsoo/shared';
import { FormCustomChangeEvent } from '../uses/FormCustomChangeEvent';

/**
 * Properties
 */
export type ExtendedAutocompleteProps<T = Record<string, any>[]> = Omit<
    AutocompleteProps<T, undefined, undefined, undefined>,
    'renderInput' | 'value'
> & {
    /**
     * If `true`, the label will be displayed in an error state.
     */
    error?: boolean;

    /**
     * Textinput label
     */
    label?: string;

    /**
     * The helper text content.
     */
    helperText?: React.ReactNode;

    /**
     * Id field
     */
    idField?: string;

    /**
     * Id value
     */
    idValue?: DataTypes.IdType;

    /**
     * Input label properties
     */
    InputLabelProps?: Partial<InputLabelProps>;

    /**
     * Name
     */
    name?: string;

    /**
     * Id change callback
     * @param event Change event
     */
    onIdChange?(event: FormCustomChangeEvent): void;

    /**
     * Render the input.
     *
     * @param {object} params
     * @returns {ReactNode}
     */
    renderInput?: (
        params: AutocompleteRenderInputParams
    ) => React.ReactNode | void;

    /**
     * If `true`, the label is displayed as required and the `input` element` will be required.
     */
    required?: boolean;

    /**
     * Textinput variant
     */
    variant?: 'filled' | 'outlined' | 'standard' | undefined;
};

/**
 * Extended Autocomplete
 * @param props Properties
 */
export function ExtendedAutocomplete<T>(props: ExtendedAutocompleteProps<T>) {
    // Destruct
    const {
        error,
        label,
        helperText,
        idField = 'id',
        idValue,
        // eslint-disable-next-line no-shadow
        InputLabelProps,
        name,
        onChange,
        onIdChange,
        options,
        renderInput,
        required,
        variant,
        ...rest
    } = props;

    // Hidden field ref
    // Hold the real id value
    const hiddenInputRef = React.useRef<HTMLInputElement>(null);

    // Current value, default as {} to make it a controlled component
    // Init value is applied only at the first time call
    const [value, setValue] = React.useState<T | null>({} as T);

    const updateValue = (newValue: T | null) => {
        let newIdValue: DataTypes.IdType | undefined;

        if (newValue) {
            if (typeof newValue === 'object') {
                newIdValue = (newValue as any)[idField];
            }
        }

        // Update idValue
        const hiddenInput = hiddenInputRef.current;
        if (hiddenInput) {
            if (newIdValue) {
                hiddenInput.value = newIdValue.toString();
            } else {
                hiddenInput.value = '';
            }

            if (onIdChange) {
                // Change event
                const changeEvent: FormCustomChangeEvent = {
                    currentTarget: {
                        name: hiddenInput.name,
                        value: hiddenInput.value,
                        form: hiddenInput.form
                    }
                };

                // Callback
                onIdChange(changeEvent);
            }
        }

        setValue(newValue);

        return newIdValue;
    };

    // Test idValue, options, only blank value
    if (idValue && options.length > 0 && JSON.stringify(value) === '{}') {
        // Selected item find
        const selectedItem = options.find(
            (option) =>
                typeof option === 'object' &&
                (option as any)[idField] === idValue
        );
        if (selectedItem) updateValue(selectedItem);
    } else if (
        options.length === 0 &&
        hiddenInputRef &&
        hiddenInputRef.current &&
        value != null
    ) {
        updateValue(null);
    }

    // Merge the input's properties
    // renderInput is a callback function with well prepared 'params'
    // need to be destructured to the TextField component
    const mergeProperties = (params: AutocompleteRenderInputParams) => {
        // Merge well prepared properties, rest properties, shallow copy
        const merged = {
            error,
            helperText,
            label,
            name,
            required,
            variant,
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

        // Implement hidden field
        merged.InputProps.startAdornment = (
            <React.Fragment>
                {name && (
                    <input
                        type="hidden"
                        name={`${name}Id`}
                        ref={hiddenInputRef}
                    />
                )}
                {merged.InputProps.startAdornment}
            </React.Fragment>
        );

        // Return
        return merged;
    };

    const onChangeLocal = (
        event: React.ChangeEvent<{}>,
        changedValue: Value<T, undefined, undefined, undefined>,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<T>
    ) => {
        // Update value
        updateValue(changedValue);

        // Custom onChange callback
        if (onChange) onChange(event, changedValue, reason, details);
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
    return (
        <Autocomplete
            onChange={onChangeLocal}
            options={options}
            renderInput={renderInputLocal}
            value={value}
            {...rest}
        />
    );
}
