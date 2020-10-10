/**
 * Form custom change event
 */
export interface FormCustomChangeEvent {
    /**
     * Current target
     */
    currentTarget: FormCustomChangeTarget;
}

/**
 * Form custom change event target
 */
export interface FormCustomChangeTarget {
    /**
     * Field name
     */
    name: string;

    /**
     * Field value
     */
    value: string;

    /**
     * Form element
     */
    form: HTMLFormElement | null;
}
