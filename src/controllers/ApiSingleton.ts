import Axios from 'axios';
import { INotifier, INotifierCallback } from '../api/INotifier';
import { IApiSettings, ApiSettings } from '../api/IApiSettings';
import { IApiConfigs } from './IApiConfigs';

/**
 * API Singleton to deal
 */
export class ApiSingleton {
    // Singleton instance
    private static instance: ApiSingleton

    /**
     * Get the singleton instance
     */
    public static getInstance(notifier: INotifier): ApiSingleton {
        if (!ApiSingleton.instance) {
            ApiSingleton.instance = new ApiSingleton();
        }

        ApiSingleton.instance.notifier = notifier;

        return ApiSingleton.instance;
    }

    /**
     * Notifier, be sure to update to the current context
     */
    private notifier?: INotifier

    /**
     * Api settings
     */
    public readonly settings: IApiSettings

    // Constructor
    private constructor() {
        // API settings
        this.settings = ApiSettings.get();
    }

    /**
     * Error handler
     * @param error Error
     */
    protected errorHandler(error: any) {
        // Destruct properties
        const { message, request, response } = error;

        let callback: INotifierCallback | undefined;
        let errorMessage = message;
        if (response) {
            errorMessage = `Response: ${message}`;

            // 401 unauthorized
            if (response.status === 401) {
                callback = () => {
                    // Redirect to login page, homepage of React project set to '.' or './'
                    // should be configured here as undefined
                    const loginUrl = `${(this.settings.homepage || '')}/login`;
                    window.location.href = loginUrl;
                };
            }
        } else if (request) {
            errorMessage = `Request: ${message}`;
        }

        // Hide the loading bar (Same state component)
        // Report the error
        this.reportError(errorMessage, callback);
    }

    /**
     * Create API
     * @param configs Additional API configs
     */
    public createApi(configs: IApiConfigs) {
        // Create
        const api = Axios.create({
            baseURL: configs.baseUrl
        });

        // Interceptors
        api.interceptors.request.use(config => {
            // Attach token
            const { token } = this.settings;
            if (token) {
                const { headers } = config;
                headers.Authorization = `Bearer ${token}`;
            }

            if (configs.defaultLoading) {
                this.showLoading();
            }

            return config;
        }, error => {
            this.errorHandler(error);
            return Promise.reject(error);
        });

        api.interceptors.response.use(response => {
            if (configs.defaultLoading) {
                this.showLoading(false);
            }
            return response;
        }, error => {
            this.errorHandler(error);
            return Promise.reject(error);
        });

        // Return
        return api;
    }

    /**
     * Confirm action
     * @param message Message
     * @param title Title
     * @param callback Callback
     */
    public confirm(message: string, title?: string, callback?: INotifierCallback) {
        this.notifier?.confirm(message, title, callback);
    }

    /**
     * Report message
     * @param message Message
     * @param title Title
     * @param callback Callback
     */
    public report(message: string, title?: string, callback?: INotifierCallback) {
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
