import React from 'react';
import InputMask, { Props } from 'react-input-mask';
import { TextField, TextFieldProps } from '@material-ui/core';

/**
 * Masked input properties
 */
export type MaskedInputProps = TextFieldProps & Props

/**
 * Masked input
 * @param props Properties
 */
export function MaskedInput(props: MaskedInputProps) {
    // Destruct
    const {
        error,
        fullWidth,
        helperText,
        InputLabelProps,
        label,
        name,
        required,
        ...rest
    } = props;

    return (
        <InputMask name={name} {...rest as Props}>
            {() => (
                <TextField
                    error={error}
                    fullWidth={fullWidth}
                    helperText={helperText}
                    InputLabelProps={InputLabelProps}
                    name={name}
                    required={required}
                    label={label}
                />
            )}
        </InputMask>
    );
}
