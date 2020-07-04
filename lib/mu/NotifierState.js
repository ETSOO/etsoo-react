import React from 'react';
import { CreateState } from "../states/CreateState";
/**
 * Notifier reducer
 * @param state State
 * @param action Action
 */
export function NotifierReducer(state, action) {
    return state;
}
/**
 * Notifier context and provider
 */
export const { context: NotifierContext, provider: NotifierProvider } = CreateState(NotifierReducer, {}, (state) => {
    return (React.createElement("h1", null, "Hello, world!"));
});
