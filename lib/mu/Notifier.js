import React from "react";
import { NotifierActionType } from "../states/NotifierState";
import { NotifierContext } from "./NotifierUI";
/**
 * Notifier class
 */
export class Notifier {
    /**
     * Constructor
     */
    constructor() {
        /**
         * Notifier update
         */
        this.notifierUpdate = undefined;
        // Init notifier update
        this.notifierUpdate = React.useContext(NotifierContext);
    }
    /**
     * Confirm action
     * @param message Message
     * @param title Title
     * @param callback Callback
     */
    confirm(message, title, callback) {
        var _a;
        const action = { type: NotifierActionType.Confirm, title: title, message: message, callback: callback };
        (_a = this.notifierUpdate) === null || _a === void 0 ? void 0 : _a.dispatch(action);
    }
    /**
     * Report message
     * @param message Message
     * @param title Title
     * @param callback Callback
     */
    report(message, title, callback) {
        var _a;
        const action = { type: NotifierActionType.Message, title: title, message: message, callback: callback };
        (_a = this.notifierUpdate) === null || _a === void 0 ? void 0 : _a.dispatch(action);
    }
    /**
     * Report error
     * @param error Error message
     * @param callback Callback
     */
    reportError(error, callback) {
        var _a;
        const action = { type: NotifierActionType.Error, message: error, callback: callback };
        (_a = this.notifierUpdate) === null || _a === void 0 ? void 0 : _a.dispatch(action);
    }
    /**
     * Show loading
     * @param show Show it or hide
     */
    showLoading(show = true) {
        var _a;
        const action = { type: show ? NotifierActionType.Loading : NotifierActionType.None };
        (_a = this.notifierUpdate) === null || _a === void 0 ? void 0 : _a.dispatch(action);
    }
}
