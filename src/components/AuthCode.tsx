import React, { FunctionComponent } from 'react'

// Auth code type
enum AuthCodeType {
    Numeric = 1,
    Alpha = 2,
    AlphaNumeric = 3
}

// Auth code properties
type AuthCodeProps = {
    length?: number,
    type?: AuthCodeType
}

// Auth code component
export function AuthCode(props:AuthCodeProps) {
    return <h1>Hello world: {props.length}</h1>;
}