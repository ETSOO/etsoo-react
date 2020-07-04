/**
 * Application user interface
 */
export interface IUser {
    /**
     * Authorized or not
     */
    authorized: boolean;
    /**
     * User name
     */
    name: string;
    /**
     * User id
     */
    id: number;
    /**
     * Organization current user belongs
     */
    organization_id: number;
    /**
     * Access token
     */
    token: string;
}
