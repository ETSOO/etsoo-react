import { IAction } from './IState';
import { INotifierCallback } from '../api/INotifier';

/**
 * Notifier action type
 */
export enum NotifierActionType {
    // Confirm
    Confirm,

    // Error
    Error,

    // Loading
    Loading,

    // Message
    Message,

    // None
    None
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
export function NotifierReducer(state: INotifierState, action: NotifierAction) {
    // Equality check
    if (state.type === action.type && state.message === action.message) {
        return state;
    }

    // Simplly copy
    return { ...action };
}
