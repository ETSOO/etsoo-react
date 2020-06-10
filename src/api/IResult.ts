/**
 * Result data
 * Indexable type
 */
export interface IResultData {
    readonly [key: string]: any
}

/**
 * Result errors
 * Indexable type
 */
export interface IResultErrors {
    readonly [key: string]: string[]
}

/**
 * Operation result interface
 */
export interface IResult<D extends IResultData> {
    /**
     * Error code, 0 means successful
     */
    readonly errorCode: number

    /**
     * Error related field
     */
    readonly field?: string

    /**
     * Error message id
     */
    readonly mid?: string

    /**
     * Error message
     */
    readonly message?: string

    /**
     * Result data
     */
    readonly data?: D

    /**
     * Result errors
     */
    readonly errors?: IResultErrors

    /**
     * Is OK?
     */
    readonly ok:boolean
}

/**
 * Operation raw result interface
 */
export interface IRawResult {
    /**
     * Error code, 0 means successful
     */
    readonly error_code: number

    /**
     * Error related field
     */
    readonly field?: string

    /**
     * Error message id
     */
    readonly mid?: string

    /**
     * Error message
     */
    readonly message?: string

    /**
     * Result data
     */
    readonly data?: IResultData

    /**
     * Result errors
     */
    readonly errors?: IResultErrors
}