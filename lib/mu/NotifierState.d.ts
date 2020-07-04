import React from 'react';
import { IAction } from "../states/IState";
/**
 * Notifier state
 */
export interface INotifier {
}
/**
 * Notifier action
 */
export interface NotifierAction extends IAction {
}
/**
 * Notifier reducer
 * @param state State
 * @param action Action
 */
export declare function NotifierReducer(state: INotifier, action: NotifierAction): INotifier;
/**
 * Notifier context and provider
 */
export declare const NotifierContext: React.Context<import("../states/IState").IUpdate<INotifier, NotifierAction>>, NotifierProvider: React.FunctionComponent<{}>;
