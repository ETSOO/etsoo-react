import React from 'react';
import TextField from '@material-ui/core/TextField';
/**
 * Password input
 * @param props Properties
 */
export const PasswordField = (props) => {
    props = Object.assign({ type: 'password' }, props);
    return (React.createElement(TextField, Object.assign({}, props), props.children));
};
