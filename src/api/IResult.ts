import { ApiError } from '@etsoo/restclient';

/**
 * Result data
 * Indexable type
 */
export interface IResultData {
    readonly [key: string]: any;
}

/**
 * Add/Edit result data
 */
export interface IdResultData extends IResultData {
    id: number | string;
}

/**
 * Result errors
 * Indexable type
 */
export interface IResultErrors {
    readonly [key: string]: string[];
}

/**
 * Operation result interface
 */
export interface IResult<D extends IResultData = IResultData> {
    /**
     * Error code, 0 means successful
     */
    readonly errorCode: number;

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
    readonly data?: D;

    /**
     * Result errors
     */
    readonly errors?: IResultErrors;

    /**
     * Is OK?
     */
    readonly ok: boolean;
}

/**
 * Result error
 */
export class ResultError extends Error {
    /**
     * Format the result to a meaningful string
     * @param result Result
     */
    public static format(result: IResult) {
        const field = result.field ? `, ${result.field}` : '';
        return `${result.message || 'Error'} (${result.errorCode}${field})`;
    }

    /**
     * Related result
     */
    public result: IResult;

    /**
     * Constructor
     * @param result Result
     */
    constructor(result: IResult) {
        // Super
        super(ResultError.format(result));

        // Name
        this.name = 'ResultError';

        // Hold the result
        this.result = result;
    }
}

/**
 * Error to operation result
 * @param error Error
 */
export function errorToResult<D extends IResultData>(error: Error) {
    // If the error is ApiError, hold the status in errorCode property
    const errorCode = error instanceof ApiError ? error.status : -1;

    // Result
    const result: IResult<D> = {
        errorCode,
        ok: false,
        field: error.name,
        message: error.message
    };

    // Return
    return result;
}
