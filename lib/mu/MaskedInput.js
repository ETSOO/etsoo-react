import React from "react";
import InputMask from "react-input-mask";
import { TextField } from "@material-ui/core";
/**
 * Masked input
 * @param props Properties
 */
export function MaskedInput({ fullWidth, InputLabelProps, label, ...rest }) {
    return (React.createElement(InputMask, Object.assign({}, rest), () => React.createElement(TextField, { fullWidth: fullWidth, InputLabelProps: InputLabelProps, label: label })));
}
