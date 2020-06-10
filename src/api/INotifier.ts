/**
 * Notifier interface
 */
export interface INotifier {
    /**
     * Confirm action
     * @param message Message
     * @param title Title
     * @callback callback Callback
     */
    confirm(message: string, title: string | undefined, callback: INotifierCallback | null): void

    /**
     * Report message
     * @param message Message
     * @param title Title
     * @callback callback Callback
     */
    report(message: string, title: string | undefined, callback: INotifierCallback | null): void

    /**
     * Report error
     * @param error Error message
     * @callback callback Callback
     */
    reportError(error: string, callback: INotifierCallback | null): void

    /**
     * Show loading
     * @param show Show it or hide 
     */
    showLoading(show: boolean): void
}

/**
 * Notifier callback function
 */
export interface INotifierCallback {
    (ok: boolean): void
}