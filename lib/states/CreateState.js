import React from "react";
/**
 * Generic to create state context and provider
 * @param reducer Reduce function
 * @param initState Init state
 * @param uiCreator Additional UI creator
 */
export function CreateState(reducer, initState, uiCreator = null) {
    // State context
    const context = React.createContext({});
    // State context provider
    const provider = (props) => {
        // Update reducer
        const [state, dispatch] = React.useReducer(reducer, initState);
        // Avoid unnecessary re-renders
        // https://alligator.io/react/usememo/
        const contextValue = React.useMemo(() => {
            return { state, dispatch };
        }, [state, dispatch]);
        // With or without uiCreator
        if (uiCreator) {
            return (React.createElement(context.Provider, { value: contextValue },
                props.children,
                uiCreator(state, dispatch)));
        }
        else {
            return (React.createElement(context.Provider, { value: contextValue }, props.children));
        }
    };
    // Return
    return {
        context,
        provider
    };
}
