import { CreateState } from "./CreateState";
/**
 * User action type
 * Style like 'const enum' will remove definition of the enum and cause module errors
 */
export var UserActionType;
(function (UserActionType) {
    // Login action
    UserActionType["Login"] = "LOGIN";
    // Logout action
    UserActionType["Logout"] = "LOGOUT";
    // Update action
    UserActionType["Update"] = "UPDATE";
})(UserActionType || (UserActionType = {}));
/**
 * User reducer
 * @param state State
 * @param action Action
 */
export function UserReducer(state, action) {
    switch (action.type) {
        case UserActionType.Login:
            return Object.assign({}, action.user, action.update || {}, { authorized: true });
        case UserActionType.Logout:
            return Object.assign({}, state, { authorized: false });
        case UserActionType.Update:
            return Object.assign({}, state, action.update);
        default:
            return state;
    }
}
/**
 * User context and provider
 */
export const { context: UserStateContext, provider: UserStateProvider } = CreateState(UserReducer, {});
