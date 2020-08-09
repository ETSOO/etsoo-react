import {
    IApi,
    ApiMethod,
    IApiPayload,
    ApiRequestData,
    IApiOptions,
    IApiErrorHandler
} from './IApi';

export abstract class ApiBase implements IApi {
    static buildData(
        method: ApiMethod,
        headers: Headers,
        data?: ApiRequestData
    ) {
        // No data
        if (data == null) {
            return undefined;
        }

        // Type of the content
        const type = typeof data;
        if (type === 'object') {
            return JSON.stringify(data);
        }

        return undefined;
    }

    /**
     * API base url
     */
    baseUrl?: string;

    /**
     * API error handler
     * @param error Error
     */
    onError?: IApiErrorHandler;

    /**
     * Default options
     */
    options?: IApiOptions;

    /**
     * Build API url
     * @param url API url
     */
    protected buildUrl(url: string) {
        return !url.includes('://') && this.baseUrl
            ? `${this.baseUrl}${url}`
            : url;
    }

    /**
     * Merge API options
     * @param apiOptions API options
     */
    protected mergeOptions(apiOptions: IApiOptions) {
        if (this.options) {
            Object.keys(this.options).forEach((key) => {
                const value = this.options![key];
                if (value == null) {
                    return;
                }
                // eslint-disable-next-line no-param-reassign
                apiOptions[key] = value;
            });
        }
    }

    /**
     * Handle error
     * @param error Error
     * @param localDoError Local error handler
     */
    protected handleError(error: Error, localDoError?: IApiErrorHandler) {
        if (localDoError == null && this.onError == null) {
            // No error handler, throw the error
            throw error;
        }

        if (localDoError && localDoError(error) === false) {
            // Local error handler
            // return false will prevent further handle
            return;
        }

        if (this.onError) {
            // Global error handler
            this.onError(error);
        }
    }

    /**
     * Request to API
     * @param method Method
     * @param url API URL
     * @param data Passed data
     * @param payload Payload
     */
    abstract request<T>(
        method: ApiMethod,
        url: string,
        data?: ApiRequestData,
        payload?: IApiPayload<T>
    ): Promise<T | undefined>;

    /**
     * Delete API
     * @param url API URL
     * @param data Passed data
     * @param payload Payload
     */
    async delete<T>(
        url: string,
        data?: ApiRequestData,
        payload?: IApiPayload<T>
    ) {
        const result = await this.request<T>(
            ApiMethod.DELETE,
            url,
            data,
            payload
        );
        return result;
    }

    /**
     * Get API
     * @param url API URL
     * @param data Passed data
     * @param payload Payload
     */
    async get<T>(url: string, data?: ApiRequestData, payload?: IApiPayload<T>) {
        const result = await this.request<T>(ApiMethod.GET, url, data, payload);
        return result;
    }

    /**
     * Patch API
     * @param url API URL
     * @param data Passed data
     * @param payload Payload
     */
    async patch<T>(
        url: string,
        data?: ApiRequestData,
        payload?: IApiPayload<T>
    ) {
        const result = await this.request<T>(
            ApiMethod.PATCH,
            url,
            data,
            payload
        );
        return result;
    }

    /**
     * Post API
     * @param url API URL
     * @param data Passed data
     * @param payload Payload
     */
    async post<T>(
        url: string,
        data?: ApiRequestData,
        payload?: IApiPayload<T>
    ) {
        const result = await this.request<T>(
            ApiMethod.POST,
            url,
            data,
            payload
        );
        return result;
    }

    /**
     * Put API
     * @param url API URL
     * @param data Passed data
     * @param payload Payload
     */
    async put<T>(url: string, data?: ApiRequestData, payload?: IApiPayload<T>) {
        const result = await this.request<T>(ApiMethod.PUT, url, data, payload);
        return result;
    }
}
