import React from "react";
export function StateCreator(reducer, initState) {
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
        return (React.createElement(context.Provider, { value: contextValue }, props.children));
    };
    // Return
    return {
        context,
        provider
    };
}
