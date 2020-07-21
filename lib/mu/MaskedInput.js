import React from "react";
import InputMask from "react-input-mask";
import { TextField } from "@material-ui/core";
/**
 * Masked input
 * @param props Properties
 */
export function MaskedInput({ error, fullWidth, helperText, InputLabelProps, label, name, required, ...rest }) {
    return (React.createElement(InputMask, Object.assign({ name: name }, rest), () => React.createElement(TextField, { error: error, fullWidth: fullWidth, helperText: helperText, InputLabelProps: InputLabelProps, name: name, required: required, label: label })));
}
