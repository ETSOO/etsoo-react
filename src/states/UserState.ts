import { IAction } from './IState';
import { CreateState } from './CreateState';
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
export interface IUser extends IApiUser, IUserUpdate {}

/**
 * User action type
 * Style like 'const enum' will remove definition of the enum and cause module errors
 */
export enum UserActionType {
    // Login action
    Login = 'LOGIN',

    // Logout action
    Logout = 'LOGOUT',

    // Update action
    Update = 'UPDATE'
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
export function UserReducer(state: IUser, action: UserAction) {
    switch (action.type) {
        case UserActionType.Login:
            return { ...action.user!, ...action.update, authorized: true };
        case UserActionType.Logout:
            return { ...state, authorized: false };
        case UserActionType.Update:
            return { ...state, ...action.update };
        default:
            return state;
    }
}

/**
 * User context and provider
 */
export const {
    context: UserStateContext,
    provider: UserStateProvider
} = CreateState(UserReducer, {} as IUser);
