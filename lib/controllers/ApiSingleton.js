import Axios from 'axios';
import { ApiSettings } from '../api/IApiSettings';
/**
 * API Singleton to deal
 */
export class ApiSingleton {
    // Constructor
    constructor() {
        // API settings
        this.settings = ApiSettings.get();
    }
    /**
     * Get the singleton instance
     */
    static getInstance(notifier) {
        if (!ApiSingleton.instance) {
            ApiSingleton.instance = new ApiSingleton();
        }
        ApiSingleton.instance.notifier = notifier;
        return ApiSingleton.instance;
    }
    /**
     * Error handler
     * @param error Error
     */
    errorHandler(error) {
        // Destruct properties
        const { message, request, response } = error;
        let callback;
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
        }
        else if (request) {
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
    createApi(configs) {
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
    confirm(message, title, callback) {
        var _a;
        (_a = this.notifier) === null || _a === void 0 ? void 0 : _a.confirm(message, title, callback);
    }
    /**
     * Report message
     * @param message Message
     * @param title Title
     * @param callback Callback
     */
    report(message, title, callback) {
        var _a;
        (_a = this.notifier) === null || _a === void 0 ? void 0 : _a.report(message, title, callback);
    }
    /**
     * Report error
     * @param error Error message
     * @param callback Callback
     */
    reportError(error, callback) {
        var _a;
        (_a = this.notifier) === null || _a === void 0 ? void 0 : _a.reportError(error, callback);
    }
    /**
     * Show loading
     * @param show Show it or hide
     */
    showLoading(show = true) {
        var _a;
        (_a = this.notifier) === null || _a === void 0 ? void 0 : _a.showLoading(show);
    }
    /**
     * Update the API token
     * @param token API token
     */
    UpdateToken(token) {
        this.settings.token = token;
    }
}
