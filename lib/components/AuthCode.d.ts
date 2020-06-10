import React from 'react';
import { StandardTextFieldProps } from '@material-ui/core';
/**
 * Auth code properties
 */
export interface AuthCodeProps extends StandardTextFieldProps {
    api: string;
}
export declare const AuthCode: React.FunctionComponent<AuthCodeProps>;
