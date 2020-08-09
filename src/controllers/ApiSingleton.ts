import { IApi } from '@etsoo/restclient';
import { INotifier, INotifierCallback } from '../api/INotifier';
import { IApiSettings, ApiSettings } from '../api/IApiSettings';

/**
 * API creator
 */
export interface IApiCreator {
    (settings: IApiSettings): IApi;
}

/**
 * API Singleton to deal
 */
export class ApiSingleton {
    // Singleton instance
    private static instance: ApiSingleton;

    /**
     * Get the singleton instance
     * @param apiCreator API creator
     * @param notifier Notifier
     */
    public static getInstance(
        apiCreator: IApiCreator,
        notifier: INotifier
    ): ApiSingleton {
        if (!ApiSingleton.instance) {
            ApiSingleton.instance = new ApiSingleton(apiCreator, notifier);
        }
        return ApiSingleton.instance;
    }

    /**
     * Notifier, be sure to update to the current context
     */
    private notifier?: INotifier;

    /**
     * Api
     */
    public readonly api: IApi;

    /**
     * Settings
     */
    public readonly settings: IApiSettings;

    // Constructor
    private constructor(apiCreator: IApiCreator, notifier: INotifier) {
        this.settings = ApiSettings.get();
        this.api = apiCreator(this.settings);
        this.notifier = notifier;

        // Base url of the API
        this.api.baseUrl = this.settings.endpoint;

        // Global API error handler
        this.api.onError = (error: Error) => {
            this.reportError(error.toString());
        };
    }

    /**
     * Confirm action
     * @param message Message
     * @param title Title
     * @param callback Callback
     */
    public confirm(
        message: string,
        title?: string,
        callback?: INotifierCallback
    ) {
        this.notifier?.confirm(message, title, callback);
    }

    /**
     * Report message
     * @param message Message
     * @param title Title
     * @param callback Callback
     */
    public report(
        message: string,
        title?: string,
        callback?: INotifierCallback
    ) {
        this.notifier?.report(message, title, callback);
    }

    /**
     * Report error
     * @param error Error message
     * @param callback Callback
     */
    public reportError(error: string, callback?: INotifierCallback) {
        this.notifier?.reportError(error, callback);
    }

    /**
     * Show loading
     * @param show Show it or hide
     */
    public showLoading(show: boolean = true) {
        this.notifier?.showLoading(show);
    }

    /**
     * Update the API token
     * @param token API token
     */
    public UpdateToken(token?: string) {
        this.settings.token = token;
    }
}
