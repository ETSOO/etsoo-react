import { IAction } from './IState';
import { INotifierCallback } from '../api/INotifier';
/**
 * Notifier action type
 */
export declare enum NotifierActionType {
    Confirm = 0,
    Error = 1,
    Loading = 2,
    Message = 3,
    None = 4
}
/**
 * Notifier state
 */
export interface INotifierState {
    /**
     * Callback function
     */
    callback?: INotifierCallback | null;
    /**
     * Message
     */
    message?: string;
    /**
     * Title
     */
    title?: string;
    /**
     * Type
     */
    type: NotifierActionType;
}
/**
 * Notifier action
 */
export interface NotifierAction extends IAction {
    /**
     * Callback function
     */
    callback?: INotifierCallback;
    /**
     * Message
     */
    message?: string;
    /**
     * Title
     */
    title?: string;
    /**
     * Type
     */
    type: NotifierActionType;
}
/**
 * Notifier reducer
 * @param state State
 * @param action Action
 */
export declare function NotifierReducer(state: INotifierState, action: NotifierAction): INotifierState;
