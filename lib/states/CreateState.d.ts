import React from 'react';
import { IState, IAction, IUpdate, IUICreator } from './IState';
/**
 * Generic to create state context and provider
 * @param reducer Reduce function
 * @param initState Init state
 * @param uiCreator Additional UI creator
 */
export declare function CreateState<S extends IState, A extends IAction>(reducer: React.Reducer<S, A>, initState: S, uiCreator?: IUICreator<S, A>): {
    context: React.Context<IUpdate<S, A>>;
    provider: React.FunctionComponent<{}>;
};
