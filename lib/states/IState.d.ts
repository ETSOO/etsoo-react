import React from "react";
/**
 * State data interface
 */
export interface IState {
}
/**
 * State action interface
 */
export interface IAction {
}
/**
 * State UI creator
 */
export interface IUICreator<S extends IState, A extends IAction> {
    (state: S, dispatch: React.Dispatch<A>): JSX.Element;
}
/**
 * State update interface
 */
export interface IUpdate<S extends IState, A extends IAction> {
    state: S;
    dispatch: React.Dispatch<A>;
}
