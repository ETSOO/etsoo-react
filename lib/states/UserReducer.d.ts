import { IUser } from "./IUser";
/**
 * User action to manage the user
 */
export declare type UserAction = {
    /**
     * User
     */
    user?: IUser;
    /**
     * Update data
     */
    update?: object;
};
/**
 * User reducer
 * @param state State
 * @param action Action
 */
export declare function UserReducer(state?: IUser, action?: UserAction): IUser | undefined;
