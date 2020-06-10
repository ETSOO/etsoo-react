import React from "react"
import { IState, IAction, IUpdate, IUICreator } from "./IState"

/**
 * Generic to create state context and provider
 * @param reducer Reduce function
 * @param initState Init state
 * @param uiCreator Additional UI creator
 */
export function CreateState<S extends IState, A extends IAction>(reducer: React.Reducer<S, A>, initState: S, uiCreator: IUICreator<S, A> | null = null) {
    // State context
    const context = React.createContext({} as IUpdate<S, A>)

    // State context provider
    const provider: React.FunctionComponent = (props) => {
        // Update reducer
        const [state, dispatch] = React.useReducer(reducer, initState)
    
        // Avoid unnecessary re-renders
        // https://alligator.io/react/usememo/
        const contextValue = React.useMemo(() => {
            return { state, dispatch }
        }, [state, dispatch])

        // With or without uiCreator
        if(uiCreator) {
            return (
                <context.Provider value={contextValue}>
                    {props.children}
                    {uiCreator(state, dispatch)}
                </context.Provider>
            )
        } else {
            return (
                <context.Provider value={contextValue}>
                    {props.children}
                </context.Provider>
            )
        }
    }

    // Return
    return {
        context,
        provider
    }
}