import { IResultData, IResultErrors } from '../api/IResult';

/**
 * Raw result interface
 */
export interface IRawResult {
    /**
     * Error code, 0 means successful
     */
    // eslint-disable-next-line camelcase
    readonly error_code: number;

    /**
     * Error related field
     */
    readonly field?: string;

    /**
     * Error message id
     */
    readonly mid?: string;

    /**
     * Error message
     */
    readonly message?: string;

    /**
     * Result data
     */
    readonly data?: IResultData;

    /**
     * Result errors
     */
    readonly errors?: IResultErrors;
}

/**
 * Is raw result data
 * @param data Raw data
 */
export function isRawResult(data: any): data is IRawResult {
    return (
        // Should be careful, data.error_code will not pass with 0, changed to data.error_code != null
        data && data.error_code != null && typeof data.error_code === 'number'
    );
}
