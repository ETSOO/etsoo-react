import React from 'react';
import { StepperFormItemMethods } from './StepperForm';
import { IDynamicData } from '../api/IDynamicData';
/**
 * Stepper form child properties
 */
export interface StepperFormChildProps {
    /**
     * Child form ready callback
     * @param methods Methods
     */
    formReady?(methods: StepperFormItemMethods): void;
    /**
     * Validate form
     * @param formData Form data
     */
    validateForm(formData: FormData): Promise<IDynamicData | null>;
}
/**
 * Stepper form child component
 */
export declare const StepperFormChild: React.FunctionComponent<StepperFormChildProps>;
