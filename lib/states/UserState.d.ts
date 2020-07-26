/// <reference types="react" />
import { IAction } from './IState';
import { IApiUser, IApiUserBase } from '../api/IApiUser';
/**
 * Application user update interface
 */
export interface IUserUpdate {
    /**
     * Foreign name
     */
    foreignName?: string;
    /**
     * User name
     */
    name?: string;
    /**
     * Organization name
     */
    organizationName?: string;
}
/**
 * Application user interface
 */
export interface IUser extends IApiUser, IUserUpdate {
}
/**
 * User action type
 * Style like 'const enum' will remove definition of the enum and cause module errors
 */
export declare enum UserActionType {
    Login = "LOGIN",
    Logout = "LOGOUT",
    Update = "UPDATE"
}
/**
 * User action to manage the user
 */
export interface UserAction extends IAction {
    /**
     * Type
     */
    type: UserActionType;
    /**
     * User
     */
    user?: IApiUserBase;
    /**
     * User update
     */
    update?: IUserUpdate;
}
/**
 * User reducer
 * @param state State
 * @param action Action
 */
export declare function UserReducer(state: IUser, action: UserAction): IUser;
/**
 * User context and provider
 */
export declare const UserStateContext: import("react").Context<import("./IState").IUpdate<IUser, UserAction>>, UserStateProvider: import("react").FunctionComponent<{}>;
