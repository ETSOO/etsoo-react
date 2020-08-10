import { IViewModel } from './IView';

/**
 * View data transform factory
 */
export interface IViewFactory<T> {
    /**
     * Callback function
     */
    (data: IViewModel): T;
}
