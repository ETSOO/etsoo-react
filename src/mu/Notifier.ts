import React from "react"
import { INotifier, INotifierCallback } from "../api/INotifier"
import { IUpdate } from "../states/IState"
import { NotifierAction, INotifierState, NotifierActionType } from "../states/NotifierState"
import { NotifierContext } from "./NotifierUI"

/**
 * Notifier class
 */
export class Notifier implements INotifier {
    /**
     * Notifier update
     */
    private notifierUpdate?: IUpdate<INotifierState, NotifierAction> = undefined

    /**
     * Constructor
     */
    constructor() {
        // Init notifier update
        this.notifierUpdate = React.useContext(NotifierContext)
    }

    /**
     * Confirm action
     * @param message Message
     * @param title Title
     * @param callback Callback
     */
    public confirm(message: string, title?: string, callback?: INotifierCallback) {
        const action: NotifierAction = { type: NotifierActionType.Confirm, title: title, message: message, callback: callback }
        this.notifierUpdate?.dispatch(action)
    }

    /**
     * Report message
     * @param message Message
     * @param title Title
     * @param callback Callback
     */
    public report(message: string, title?: string, callback?: INotifierCallback) {
        const action: NotifierAction = { type: NotifierActionType.Message, title: title, message: message, callback: callback }
        this.notifierUpdate?.dispatch(action)
    }

    /**
     * Report error
     * @param error Error message
     * @param callback Callback
     */
    public reportError(error: string, callback?: INotifierCallback) {
        const action: NotifierAction = { type: NotifierActionType.Error, message: error, callback: callback }
        this.notifierUpdate?.dispatch(action)
    }

    /**
     * Show loading
     * @param show Show it or hide 
     */
    public showLoading(show: boolean = true) {
        const action: NotifierAction = { type: show ? NotifierActionType.Loading : NotifierActionType.None }
        this.notifierUpdate?.dispatch(action)
    }
}