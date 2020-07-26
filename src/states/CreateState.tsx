import React from 'react';
import {
    IState, IAction, IUpdate, IUICreator
} from './IState';

/**
 * Generic to create state context and provider
 * @param reducer Reduce function
 * @param initState Init state
 * @param uiCreator Additional UI creator
 */
export function CreateState<S extends IState, A extends IAction>(
    reducer: React.Reducer<S, A>,
    initState: S,
    uiCreator?: IUICreator<S, A>
) {
    // State context
    const context = React.createContext({} as IUpdate<S, A>);

    // State context provider
    const provider: React.FunctionComponent = (props) => {
        // Destruct
        const { children } = props;

        // Update reducer
        const [state, dispatch] = React.useReducer(reducer, initState);

        // Context default value
        const contextValue = { state, dispatch };

        // With or without uiCreator
        if (uiCreator) {
            return (
                <context.Provider value={contextValue}>
                    {children}
                    {uiCreator(state, dispatch)}
                </context.Provider>
            );
        }

        return (
            <context.Provider value={contextValue}>
                {children}
            </context.Provider>
        );
    };

    // Return
    return {
        context,
        provider
    };
}
