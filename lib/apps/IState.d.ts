import { IUser } from './IUser';
/**
 * Application state interface
 */
export interface IState {
    /**
     * Cloud id, like xw
     */
    cloud: string;
    /**
     * Domain, like etsoo.com
     */
    domain: string;
    /**
     * Current user
     */
    user?: IUser;
}
