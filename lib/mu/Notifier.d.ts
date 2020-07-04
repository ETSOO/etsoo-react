import { INotifier, INotifierCallback } from "../api/INotifier";
/**
 * Notifier class
 */
export declare class Notifier implements INotifier {
    /**
     * Notifier update
     */
    private notifierUpdate?;
    /**
     * Constructor
     */
    constructor();
    /**
     * Confirm action
     * @param message Message
     * @param title Title
     * @param callback Callback
     */
    confirm(message: string, title?: string | undefined, callback?: INotifierCallback | null): void;
    /**
     * Report message
     * @param message Message
     * @param title Title
     * @param callback Callback
     */
    report(message: string, title?: string | undefined, callback?: INotifierCallback | null): void;
    /**
     * Report error
     * @param error Error message
     * @param callback Callback
     */
    reportError(error: string, callback?: INotifierCallback | null): void;
    /**
     * Show loading
     * @param show Show it or hide
     */
    showLoading(show?: boolean): void;
}
