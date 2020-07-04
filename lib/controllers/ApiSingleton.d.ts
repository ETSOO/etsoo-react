import { INotifier, INotifierCallback } from "../api/INotifier";
import { IApiSettings } from "../api/IApiSettings";
import { IApiConfigs } from "./IApiConfigs";
/**
 * API Singleton to deal
 */
export declare class ApiSingleton {
    private static instance;
    /**
     * Get the singleton instance
     */
    static getInstance(notifier: INotifier): ApiSingleton;
    /**
     * Notifier, be sure to update to the current context
     */
    private notifier?;
    /**
     * Api settings
     */
    readonly settings: IApiSettings;
    private constructor();
    private errorHandler;
    /**
     * Create API
     * @param configs Additional API configs
     */
    createApi(configs: IApiConfigs): import("axios").AxiosInstance;
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
    /**
     * Update the API token
     * @param token API token
     */
    UpdateToken(token?: string): void;
}
