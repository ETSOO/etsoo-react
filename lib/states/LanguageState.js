import { CreateState } from "./CreateState";
/**
 * Language reducer
 * @param state State
 * @param action Action
 */
export function LanguageReducer(state, action) {
    if (state.name === action.name)
        return state;
    if (action.name) {
        return Object.assign({}, state, action);
    }
    return state;
}
/**
 * Creator for language context and provider globally, not inside a component to avoid problem:
 * Cannot update a component (`provider`) while rendering a different component (`Login`)
 * @param language Current language
 */
export const LanguageStateCreator = ((languageItem) => {
    // Default
    const defaultLanguageItem = languageItem == null ? {} : { name: languageItem.name, labels: languageItem.labels };
    // Act
    return CreateState(LanguageReducer, defaultLanguageItem);
});
