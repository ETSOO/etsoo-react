/**
 * Language reducer
 * @param state State
 * @param action Action
 */
export function LanguageReducer(state, action) {
    if (action === null || action === void 0 ? void 0 : action.name) {
        return Object.assign({}, state, action);
    }
    return state;
}
