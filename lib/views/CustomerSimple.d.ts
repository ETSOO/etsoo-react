import { IViewModel } from './IView';
/**
 * View customer with field 'simple'
 */
export interface ViewCustomerSimpleModel extends IViewModel {
    id: number;
    name: string;
    category_id: number;
    top_category_id: number;
    top_category: string;
}
