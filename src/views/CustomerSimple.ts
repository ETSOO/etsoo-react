/* eslint-disable camelcase */
import { IViewModel } from './IView';

/**
 * View customer with field 'simple'
 */
export interface ViewCustomerSimpleModel extends IViewModel {
    // Id
    id: number

    // Name
    name: string

    // Main category id
    category_id: number

    // Top category id
    top_category_id: number

    // Top category name
    top_category: string
}
