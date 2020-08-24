import { DataTypes } from '@etsoo/shared';
import { IResult } from '../api/IResult';

/**
 * Form submit callback
 */
export interface ISubmitCallback {
    /**
     * Callback
     * @param data Form JSON data
     * @returns Operation result
     */
    (data: DataTypes.DynamicData): Promise<IResult | undefined>;
}

/**
 * Submit form properties
 */
export interface SubmitFormProps {
    /**
     * Submit callback
     */
    callback: ISubmitCallback;
}
