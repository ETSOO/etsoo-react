declare enum AuthCodeType {
    Numeric = 1,
    Alpha = 2,
    AlphaNumeric = 3
}
declare type AuthCodeProps = {
    length?: number;
    type?: AuthCodeType;
};
export declare function AuthCode(props: AuthCodeProps): JSX.Element;
export {};
