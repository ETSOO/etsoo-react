import { IApi, ApiAuthorizationScheme } from '@etsoo/restclient';
import {
    NotificationReturn,
    NotificationType,
    NotificationContainer,
    NotificationMessageType,
    NotificationAlign,
    NotificationMU
} from '@etsoo/notificationmu';
import { IApiSettings } from './IApiSettings';
import { ApiSettings } from './ApiSettings';

/**
 * API creator
 */
export interface IApiCreator {
    (settings: IApiSettings): IApi;
}

/**
 * Notification message type
 */
export { NotificationMessageType, NotificationAlign };

/**
 * Notification report more parameters
 */
export interface NotificationReportMore {
    /**
     * Display align
     */
    align?: NotificationAlign;

    /**
     * Callback
     */
    callback?: NotificationReturn<void>;

    /**
     * Time span to dismiss
     */
    timespan?: number;

    /**
     * Add to the top
     */
    top?: boolean;
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
     */
    public static getInstance(apiCreator: IApiCreator): ApiSingleton {
        if (!ApiSingleton.instance) {
            ApiSingleton.instance = new ApiSingleton(apiCreator);
        }
        return ApiSingleton.instance;
    }

    /**
     * Api
     */
    public readonly api: IApi;

    /**
     * Settings
     */
    public readonly settings: IApiSettings;

    // Loading id
    private loadingNotification?: NotificationMU;

    // Constructor
    private constructor(apiCreator: IApiCreator) {
        this.settings = ApiSettings.get();
        this.api = apiCreator(this.settings);

        // Base url of the API
        this.api.baseUrl = this.settings.endpoint;
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
        callback?: NotificationReturn<boolean>
    ) {
        // Notification object
        const notification = new NotificationMU(
            NotificationType.Confirm,
            message,
            title
        );

        // On return callback
        notification.onReturn = callback;

        // Add to display
        this.notify(notification);
    }

    /**
     * Hide loading
     * @param title Title
     */
    public hideLoading() {
        if (this.loadingNotification) {
            // Remove it
            NotificationContainer.remove(this.loadingNotification);

            // Reset the id
            this.loadingNotification = undefined;
        }
    }

    /**
     * Notify message
     * @param notification Notification
     * @param top Add to the top?
     */
    public notify(notification: NotificationMU, top?: boolean) {
        // Add to display
        NotificationContainer.add(notification, top);
    }

    /**
     * Prompt action
     * @param message Message
     * @param title Title
     * @param props More properties
     * @param callback Callback
     */
    public prompt(
        message: string,
        title?: string,
        props?: any,
        callback?: NotificationReturn<string>
    ) {
        // Notification object
        const notification = new NotificationMU(
            NotificationType.Prompt,
            message,
            title
        );

        // More properties attached
        notification.inputProps = props;

        // On return callback
        notification.onReturn = callback;

        // Add to display
        this.notify(notification);
    }

    /**
     * Report message
     * @param message Message
     * @param callback Callback
     */
    public report(message: string, callback?: NotificationReturn<void>) {
        // Notification object
        const notification = new NotificationMU(
            NotificationMessageType.Default,
            message
        );

        // On return callback
        notification.onReturn = callback;

        // Add to display
        NotificationContainer.add(notification);
    }

    /**
     * Report more message
     * @param type Type
     * @param message Message
     * @param title Title
     * @param params Parameters
     */
    public reportMore(
        type: NotificationMessageType,
        message: string,
        title?: string,
        params?: NotificationReportMore
    ) {
        // Destruct parameters
        const { align, callback, timespan, top } = params || {};

        // Notification object
        const notification = new NotificationMU(type, message, title, align);

        // On return callback
        notification.onReturn = callback;

        // Timespan to dismiss
        if (timespan != null && timespan >= 0) notification.timespan = timespan;

        // Add to display
        NotificationContainer.add(notification, top);
    }

    /**
     * Report error
     * @param error Error message
     * @param callback Callback
     */
    public reportError(error: string, callback?: NotificationReturn<void>) {
        // Notification object
        const notification = new NotificationMU(NotificationType.Error, error);

        // On return callback
        notification.onReturn = callback;

        // Add to display
        this.notify(notification);
    }

    /**
     * Show loading
     * @param title Title
     */
    public showLoading(title?: string) {
        // If exists, hide it first
        if (this.loadingNotification) this.hideLoading();

        // Notification object
        const notification = new NotificationMU(
            NotificationType.Loading,
            title || ''
        );

        // Hold the id
        this.loadingNotification = notification;

        // Add to display
        this.notify(notification);
    }

    /**
     * Update the API token
     * @param token API token
     */
    public UpdateToken(token?: string) {
        this.api.authorize(ApiAuthorizationScheme.Bearer, token);
    }
}
