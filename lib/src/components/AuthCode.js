import React from 'react';
// Auth code type
var AuthCodeType;
(function (AuthCodeType) {
    AuthCodeType[AuthCodeType["Numeric"] = 1] = "Numeric";
    AuthCodeType[AuthCodeType["Alpha"] = 2] = "Alpha";
    AuthCodeType[AuthCodeType["AlphaNumeric"] = 3] = "AlphaNumeric";
})(AuthCodeType || (AuthCodeType = {}));
// Auth code component
export function AuthCode(props) {
    return React.createElement("h1", null,
        "Hello world: ",
        props.length);
}
