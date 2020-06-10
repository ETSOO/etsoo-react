import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
// Auth code component
export const AuthCode = (props) => {
    props = Object.assign({
        InputProps: {
            endAdornment: (React.createElement(InputAdornment, { position: "end" },
                React.createElement("img", { src: props.api })))
        }
    }, props);
    return (React.createElement(TextField, Object.assign({}, props), props.children));
};
