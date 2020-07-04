/**
 * Save login data interface
 */
export interface SaveLoginData {
    /**
     * User id
     */
    readonly id: number;
    /**
     * Raw user id for login
     */
    readonly rawId: string;
    /**
     * Token
     */
    token?: string;
}
/**
 * Save login utils
 */
export declare const SaveLogin: {
    get: () => SaveLoginData | undefined;
    save: (data: SaveLoginData) => void;
    update: (token?: string | undefined) => void;
};
