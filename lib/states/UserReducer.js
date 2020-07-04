/**
 * User reducer
 * @param state State
 * @param action Action
 */
export function UserReducer(state, action) {
    if (action === null || action === void 0 ? void 0 : action.user) {
        // For login or logout, lazily update
        return action.user;
    }
    else if (action === null || action === void 0 ? void 0 : action.update) {
        // For update, don't mutate the state, use copy
        return Object.assign({}, state, action.update);
    }
    else {
        // For any unknown action
        return state;
    }
}
