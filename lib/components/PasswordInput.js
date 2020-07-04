import React from 'react';
import Input from '@material-ui/core/Input';
/**
 * Password input
 * @param props Properties
 */
export const PasswordInput = (props) => {
    props = Object.assign({ type: 'password' }, props);
    return (React.createElement(Input, Object.assign({}, props), props.children));
};
