import React from 'react';
import { InputProps } from '@material-ui/core/Input';
export interface PasswordInputProps extends InputProps {
    type?: 'password';
}
/**
 * Password input
 * @param props Properties
 */
export declare const PasswordInput: React.FunctionComponent<PasswordInputProps>;
