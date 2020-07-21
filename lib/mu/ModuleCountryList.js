import React from "react";
import { CountryList } from "./CountryList";
/**
 * Module country list
 */
export const ModuleCountryList = React.forwardRef((props, ref) => {
    // Label format
    const getOptionLabel = (item) => { return item.short_name || item.name; };
    // Load data
    const loadItems = () => {
        return Promise.resolve([]);
    };
    // Return
    return React.createElement(CountryList, Object.assign({ getOptionLabel: getOptionLabel, loadItems: loadItems }, props));
});
