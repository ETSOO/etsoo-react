import { IViewModel } from "./IView";

/**
 * View factory callback
 */
export interface IViewFactory<T>
{
    /**
     * Callback function
     */
    (data: IViewModel): T
}