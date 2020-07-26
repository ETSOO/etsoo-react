import React from 'react';
/**
 * Generic to create state context and provider
 * @param reducer Reduce function
 * @param initState Init state
 * @param uiCreator Additional UI creator
 */
export function CreateState(reducer, initState, uiCreator) {
    // State context
    const context = React.createContext({});
    // State context provider
    const provider = (props) => {
        // Destruct
        const { children } = props;
        // Update reducer
        const [state, dispatch] = React.useReducer(reducer, initState);
        // Context default value
        const contextValue = { state, dispatch };
        // With or without uiCreator
        if (uiCreator) {
            return (React.createElement(context.Provider, { value: contextValue },
                children,
                uiCreator(state, dispatch)));
        }
        return (React.createElement(context.Provider, { value: contextValue }, children));
    };
    // Return
    return {
        context,
        provider
    };
}
