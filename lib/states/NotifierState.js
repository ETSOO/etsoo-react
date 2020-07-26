/**
 * Notifier action type
 */
export var NotifierActionType;
(function (NotifierActionType) {
    // Confirm
    NotifierActionType[NotifierActionType["Confirm"] = 0] = "Confirm";
    // Error
    NotifierActionType[NotifierActionType["Error"] = 1] = "Error";
    // Loading
    NotifierActionType[NotifierActionType["Loading"] = 2] = "Loading";
    // Message
    NotifierActionType[NotifierActionType["Message"] = 3] = "Message";
    // None
    NotifierActionType[NotifierActionType["None"] = 4] = "None";
})(NotifierActionType || (NotifierActionType = {}));
/**
 * Notifier reducer
 * @param state State
 * @param action Action
 */
export function NotifierReducer(state, action) {
    // Equality check
    if (state.type === action.type && state.message === action.message) {
        return state;
    }
    // Simplly copy
    return { ...action };
}
