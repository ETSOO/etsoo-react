import React from 'react';
import { DomUtils, DataTypes } from '@etsoo/shared';
import * as Yup from 'yup';
import { IResult } from '../api/IResult';
import { FormCustomChangeEvent } from './FormCustomChangeEvent';

/**
 * Form validator state field
 */
interface FormValidatorStateField {
    /**
     * Is error state
     */
    error: boolean;

    /**
     * state text
     */
    text: string;
}

/**
 * Form validator state fields
 */
interface FormValidatorStateFields {
    [key: string]: FormValidatorStateField;
}

/**
 * Form validatior
 * @param schemas Initial validation schemas
 * @param defaultField Default field to report any error without correct field
 * @param milliseconds Merge change update interval
 */
export const useFormValidator = (
    schemas: Yup.ObjectSchema<any>,
    defaultField: string,
    milliseconds: number = 200
) => {
    // useState init
    const defaultState: FormValidatorStateFields = {};
    const [state, updateState] = React.useState<FormValidatorStateFields>(
        defaultState
    );

    // Change timeout seed
    let changeSeed = 0;

    // Commit state result
    const commitResult = (field: string, result: any) => {
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
            } else {
                // New item
                const newItem: FormValidatorStateField = {
                    error: true,
                    text: result.message
                };
                state[field] = newItem;
            }
        } else {
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
    const commitObjectChange = (field: string, value: object) => {
        // Validate the field, then before catch, if catch before then, both will be triggered
        // validateAt is better than Yun.reach then validate when ref used in validation rules
        schemas
            .validateAt(field, value)
            .then((result) => {
                commitResult(field, result);
            })
            .catch((result) => {
                commitResult(field, result);
            });
    };

    // Change value handler
    const commitChange = (field: string, value: any) => {
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
    const delayChange = (field: string, value: object) => {
        clearSeed();

        changeSeed = window.setTimeout(() => {
            commitObjectChange(field, value);
        }, milliseconds);
    };

    // Common event handler
    const doHandler = (
        name: string,
        value: string,
        form?: HTMLFormElement | null,
        refs?: string[]
    ) => {
        const obj = { [name]: value };
        if (refs && form) {
            const formData = new FormData(form);
            if (refs.length === 0) {
                // Without fields included, all parsed
                Object.assign(obj, DomUtils.formDataToObject(formData));
            } else {
                refs.forEach((field) => {
                    const fieldValue = formData.get(field) as string;
                    if (fieldValue) {
                        obj[field] = fieldValue;
                    }
                });
            }
        }
        delayChange(name, obj);
    };

    // Get field, exists in schemas and defined validation tests
    const getField = (fieldName: string) => {
        if (Object.keys(schemas.fields).includes(fieldName)) {
            const field = (schemas.fields as any)[fieldName];
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
    const blurHandler = (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
        refs?: string[]
    ) => {
        const { name, value, form } = event.currentTarget;
        doHandler(name, value, form, refs);
    };

    /**
     * Input or Textarea blur handler, with all form data to validate
     * @param event Focus event
     */
    const blurFormHandler = (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        blurHandler(event, []);
    };

    /**
     * Input or Textarea change handler
     * @param event Change event
     * @param refs Reference fields
     */
    const changeHandler = (
        event:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | FormCustomChangeEvent,
        refs?: string[]
    ) => {
        const { name, value, form } = event.currentTarget;
        doHandler(name, value, form, refs);
    };

    /**
     * Input or Textarea change handler, with all form data to validate
     * @param event Focus event
     */
    const changeFormHandler = (
        event:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | FormCustomChangeEvent
    ) => {
        changeHandler(event, []);
    };

    /**
     * Update action result to error report
     * @param result Action report
     */
    const updateResult = (result: IResult) => {
        // OK status return anyway
        if (result.ok) {
            return;
        }

        // Reset
        const newState: FormValidatorStateFields = {};

        // Errors
        const { errors } = result;
        if (errors) {
            Object.keys(errors).forEach((key) => {
                const field = getField(key);
                if (newState[field] == null) {
                    // New item
                    const newItem: FormValidatorStateField = {
                        error: true,
                        text: errors[field].join('; ')
                    };

                    newState[field] = newItem;
                }
            });
        } else {
            // New item
            const field = getField(result.field || defaultField);
            const newItem: FormValidatorStateField = {
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
    const validate = async (data: any) => {
        try {
            clearSeed();
            const result = (await schemas.validate(data, {
                strict: false,
                abortEarly: false,
                stripUnknown: false
            })) as DataTypes.DynamicData;
            return result;
        } catch (e) {
            // Reset
            const newState: FormValidatorStateFields = {};

            // Iterate the error items
            if (e instanceof Yup.ValidationError) {
                e.inner.forEach((error) => {
                    if(error.path == null)
                        return;
                        
                    // Only show the first error of the field
                    const field = getField(error.path);
                    if (newState[field] == null) {
                        // New item
                        const newItem: FormValidatorStateField = {
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
    const validateForm = async (formData: FormData) => {
        const result = await validate(DomUtils.formDataToObject(formData));
        return result;
    };

    // Merge into the life cycle
    React.useEffect(
        () => () => {
            clearSeed();
        },
        []
    );

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
        errors: (field: string) => state[field]?.error,

        /**
         * State text
         * @param field Field name
         */
        texts: (field: string) => state[field]?.text,

        updateResult,

        validate,
        validateForm
    };
};
