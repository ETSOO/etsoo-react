import React from "react"
import InputMask, { Props } from "react-input-mask"
import { TextField, TextFieldProps, InputLabelProps } from "@material-ui/core"

/**
 * Masked input properties
 */
export type MaskedInputProps = TextFieldProps & Props

/**
 * Masked input
 * @param props Properties
 */
export function MaskedInput({fullWidth, InputLabelProps, label, ...rest}: MaskedInputProps) {
    return (
        <InputMask {...rest as Props}>
            {() => <TextField fullWidth={fullWidth} InputLabelProps={InputLabelProps} label={label} />}
        </InputMask>
    )
}