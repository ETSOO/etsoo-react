import React from 'react';
import * as Yup from 'yup';
import { IResultData, IResult } from '../api/IResult';
import { IDynamicData } from '../api/IDynamicData';
/**
 * Form validatior
 * @param schemas Initial validation schemas
 * @param defaultField Default field to report any error without correct field
 * @param milliseconds Merge change update interval
 */
export declare const useFormValidator: (schemas: Yup.ObjectSchema<any>, defaultField: string, milliseconds?: number) => {
    blurHandler: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, refs?: string[] | undefined) => void;
    blurFormHandler: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    changeHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, refs?: string[] | undefined) => void;
    changeFormHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    commitChange: (field: string, value: any) => void;
    commitObjectChange: (field: string, value: object) => void;
    /**
     * State error or not
     * @param field Field name
     */
    errors: (field: string) => boolean;
    /**
     * State text
     * @param field Field name
     */
    texts: (field: string) => string;
    updateResult: (result: IResult<IResultData>) => void;
    validate: (data: any) => Promise<IDynamicData | null>;
    validateForm: (formData: FormData) => Promise<IDynamicData | null>;
};
