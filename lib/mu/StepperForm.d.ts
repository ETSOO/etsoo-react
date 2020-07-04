import React from "react";
import { IDynamicData } from "../api/IDynamicData";
/**
 * Stepper form item properties
 */
export interface StepperFormItemProps {
    /**
     * Current form data
     */
    formData: IDynamicData;
    /**
     * Child form ready callback
     * @param methods Methods
     */
    formReady?(methods: StepperFormItemMethods): void;
}
/**
 * Stepper form item ref methods
 */
export interface StepperFormItemMethods {
    /**
     * Collect form data
     */
    collectData(): Promise<IDynamicData | null>;
}
/**
 * Stepper form action
 */
export declare enum StepperFormAction {
    Next = 0,
    Previous = 1,
    Submit = 2
}
/**
 * Stepper form action callback
 */
export interface StepperFormActionCallback {
    (action: StepperFormAction): void;
}
/**
 * Stepper form item
 */
export interface StepperFormItem {
    /**
     * Step form
     */
    form: React.ComponentType<StepperFormItemProps>;
    /**
     * Label for the step
     */
    label: string;
}
/**
 * Stepper form properties
 */
export interface StepperFormProps {
    /**
     * Create buttons callback
     * @param callback Action callback
     * @param last 'true' for the last item, 'false' for the first item
     */
    buttons(callback: StepperFormActionCallback, last?: boolean): React.ReactElement;
    /**
     * Max width
     */
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
    /**
     * Padding
     */
    padding?: number;
    /**
     * Prompt for exit
     */
    promptForExit?: string;
    /**
     * Steps
     */
    steps: StepperFormItem[];
    /**
     * Submit handler
     * @param data Form data
     */
    submitHandler(data: IDynamicData): void;
}
/**
 * Stepper form
 * @param props Properties
 */
export declare function StepperForm({ buttons, maxWidth, padding, promptForExit, steps, submitHandler }: StepperFormProps): JSX.Element;
