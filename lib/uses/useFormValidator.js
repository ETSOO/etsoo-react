import React from 'react';
import * as Yup from 'yup';
import { Utils } from '../api/Utils';
/**
 * Form validatior
 * @param schemas Initial validation schemas
 * @param defaultField Default field to report any error without correct field
 * @param milliseconds Merge change update interval
 */
export const useFormValidator = (schemas, defaultField, milliseconds = 200) => {
    // useState init
    const defaultState = {};
    const [state, updateState] = React.useState(defaultState);
    // Change timeout seed
    let changeSeed = 0;
    // Commit state result
    const commitResult = (field, result) => {
        const currentItem = state[field];
        if (result instanceof Yup.ValidationError) {
            // Error
            if (currentItem) {
                // First to avoid same result redraw
                if (currentItem.error && currentItem.text === result.message) {
                    return;
                }
                // Update state
                currentItem.error = true;
                currentItem.text = result.message;
            }
            else {
                // New item
                const newItem = {
                    error: true,
                    text: result.message
                };
                state[field] = newItem;
            }
        }
        else {
            // Success and no result, just continue
            if (currentItem == null) {
                return;
            }
            // Delete current state result
            delete state[field];
        }
        // Update state, for object update, need a clone
        const newState = { ...state };
        updateState(newState);
    };
    // Change object value handler
    const commitObjectChange = (field, value) => {
        // Validate the field, then before catch, if catch before then, both will be triggered
        // validateAt is better than Yun.reach then validate when ref used in validation rules
        schemas.validateAt(field, value).then(result => {
            commitResult(field, result);
        }).catch(result => {
            commitResult(field, result);
        });
    };
    // Change value handler
    const commitChange = (field, value) => {
        commitObjectChange(field, { [field]: value });
    };
    // Clear timeout seed
    const clearSeed = () => {
        if (changeSeed > 0) {
            clearTimeout(changeSeed);
            changeSeed = 0;
        }
    };
    // Delay change
    const delayChange = (field, value) => {
        clearSeed();
        changeSeed = window.setTimeout(() => {
            commitObjectChange(field, value);
        }, milliseconds);
    };
    // Common event handler
    const doHandler = (name, value, form, refs) => {
        const obj = { [name]: value };
        if (refs && form) {
            const formData = new FormData(form);
            if (refs.length === 0) {
                // Without fields included, all parsed
                Object.assign(obj, Utils.formDataToObject(formData));
            }
            else {
                refs.forEach(field => {
                    const fieldValue = formData.get(field);
                    if (fieldValue) {
                        obj[field] = fieldValue;
                    }
                });
            }
        }
        delayChange(name, obj);
    };
    // Get field, exists in schemas and defined validation tests
    const getField = (fieldName) => {
        if (Object.keys(schemas.fields).includes(fieldName)) {
            const field = schemas.fields[fieldName];
            if (field.tests == null || field.tests.length > 0) {
                // tests is null when lazy
                return fieldName;
            }
        }
        return defaultField;
    };
    /**
     * Input or Textarea blur handler
     * @param event Focus event
     * @param refs Reference fields
     */
    const blurHandler = (event, refs) => {
        const { name, value } = event.currentTarget;
        doHandler(name, value, event.currentTarget.form, refs);
    };
    /**
     * Input or Textarea blur handler, with all form data to validate
     * @param event Focus event
     */
    const blurFormHandler = (event) => {
        blurHandler(event, []);
    };
    /**
     * Input or Textarea change handler
     * @param event Change event
     * @param refs Reference fields
     */
    const changeHandler = (event, refs) => {
        const { name, value } = event.currentTarget;
        doHandler(name, value, event.currentTarget.form, refs);
    };
    /**
     * Input or Textarea change handler, with all form data to validate
     * @param event Focus event
     */
    const changeFormHandler = (event) => {
        changeHandler(event, []);
    };
    /**
     * Update action result to error report
     * @param result Action report
     */
    const updateResult = (result) => {
        // OK status return anyway
        if (result.ok) {
            return;
        }
        // Reset
        const newState = {};
        // Errors
        const { errors } = result;
        if (errors) {
            Object.keys(errors).forEach(key => {
                const field = getField(key);
                if (newState[field] == null) {
                    // New item
                    const newItem = {
                        error: true,
                        text: errors[field].join('; ')
                    };
                    newState[field] = newItem;
                }
            });
        }
        else {
            // New item
            const field = getField(result.field || defaultField);
            const newItem = {
                error: true,
                text: result.message || 'Unknown'
            };
            newState[field] = newItem;
        }
        // Update state
        updateState(newState);
    };
    /**
     * Validate form data
     * @param data form data, Object.fromEntries(new FormData(form))
     */
    const validate = async (data) => {
        try {
            clearSeed();
            const result = await schemas.validate(data, { strict: false, abortEarly: false, stripUnknown: false });
            return result;
        }
        catch (e) {
            // Reset
            const newState = {};
            // Iterate the error items
            if (e instanceof Yup.ValidationError) {
                e.inner.forEach(error => {
                    // Only show the first error of the field
                    const field = getField(error.path);
                    if (newState[field] == null) {
                        // New item
                        const newItem = {
                            error: true,
                            text: error.message
                        };
                        newState[field] = newItem;
                    }
                });
            }
            // Update state
            updateState(newState);
        }
        return null;
    };
    /**
     * Validate form data
     * @param formData Form data
     */
    const validateForm = async (formData) => {
        const result = await validate(Utils.formDataToObject(formData));
        return result;
    };
    // Merge into the life cycle
    React.useEffect(() => () => {
        clearSeed();
    }, []);
    // Return methods for manipulation
    return {
        blurHandler,
        blurFormHandler,
        changeHandler,
        changeFormHandler,
        commitChange,
        commitObjectChange,
        /**
         * State error or not
         * @param field Field name
         */
        errors: (field) => { var _a; return (_a = state[field]) === null || _a === void 0 ? void 0 : _a.error; },
        /**
         * State text
         * @param field Field name
         */
        texts: (field) => { var _a; return (_a = state[field]) === null || _a === void 0 ? void 0 : _a.text; },
        updateResult,
        validate,
        validateForm
    };
};
