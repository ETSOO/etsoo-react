/**
 * Result error
 */
export class ResultError extends Error {
    /**
     * Constructor
     * @param result Result
     */
    constructor(result) {
        // Super
        super(ResultError.format(result));
        // Hold the result
        this.result = result;
        // Set the prototype explicitly
        Object.setPrototypeOf(this, ResultError.prototype);
    }
    /**
     * Format the result to a meaningful string
     * @param result Result
     */
    static format(result) {
        return `${result.message || 'Error'} (${result.errorCode}${result.field ? ', ' + result.field : ''})`;
    }
}
