import React from "react";
/**
 * API Form
 * @param props
 * @param ref
 */
const APIFormForward = (props, ref) => {
    // hooks
    const formElement = React.useRef(null);
    React.useImperativeHandle(ref, () => ({
        changeHandler: (event) => {
            console.log(event);
        }
    }));
    return (React.createElement("form", Object.assign({ ref: formElement }, props), props.children));
};
export const APIForm = React.forwardRef(APIFormForward);
/**
 * API form validator state default value
 */
class APIFormValidatorStateClass {
    /**
     * Constructor
     * @param fields Fields
     */
    constructor(fields) {
        this.fields = fields;
    }
    /**
     * Check state is error
     */
    error(field) {
        let item = this.fields[field];
        return item === null || item === void 0 ? void 0 : item.error;
    }
    /**
     *
     */
    text(field) {
        let item = this.fields[field];
        return item === null || item === void 0 ? void 0 : item.text;
    }
}
/**
 * API form validator
 */
export class APIFormValidator {
    /**
     * Constructor
     * @param schemas Validation schemas
     */
    constructor(schemas) {
        /**
         * Blur event handler
         * Array function to hold this
         * @param event Focus event
         */
        this.blurHandler = (event) => {
            const { name, id, value } = event.currentTarget;
        };
        /**
         * Change event handler
         * Array function to hold this
         * @param event Change event
         */
        this.changeHandler = (event) => {
            const { name, id, value } = event.currentTarget;
            let item = { error: true, text: 'name: ' + value };
            this.state.fields[name] = item;
            this.updateState(new APIFormValidatorStateClass(this.state.fields));
            console.log(this.state);
        };
        // Hold validation schemas
        this.schemas = schemas;
        // Init form reference
        this.ref = React.useRef(null);
        // Use state
        let [state, updateState] = React.useState(new APIFormValidatorStateClass({}));
        this.state = state;
        this.updateState = updateState;
    }
}
