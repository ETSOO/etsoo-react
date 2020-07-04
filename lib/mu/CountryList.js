import React from "react";
import { Autocomplete } from '@material-ui/lab';
import { TextField } from "@material-ui/core";
import { Utils } from "../api/Utils";
/**
 * Country list
 */
export const CountryList = React.forwardRef(({ className, InputLabelProps, id, loadItems, name, style, ...rest }, ref) => {
    // Cache key
    const cacheKey = Utils.getLocationKey('countryList' + (id || name || ''));
    // Cache data
    const cacheData = Utils.cacheSessionDataParse(cacheKey);
    // State
    const [items, updateItems] = React.useState(cacheData || []);
    // Layout ready
    React.useEffect(() => {
        if (!cacheData) {
            // Load items
            loadItems().then((items) => {
                // Update state
                updateItems(items);
                // Cache data
                Utils.cacheSessionData(items, cacheKey);
            });
        }
    }, [cacheData]);
    // Merge the input's properties
    const mergeProperties = (params) => {
        // Merge well prepared properties, rest properties, shallow copy
        let merged = Object.assign({ name, InputLabelProps: {} }, rest, params);
        // Support to merge the 'InputLabelProps' sub property collection
        if (InputLabelProps)
            Object.assign(merged.InputLabelProps, InputLabelProps);
        // Return
        return merged;
    };
    // Return
    return React.createElement(Autocomplete, { id: id, options: items, className: className, style: style, getOptionLabel: (item) => item.short_name || item.name, 
        // renderInput is a callback function with well prepared 'params' need to be destructured to the TextField component
        renderInput: (params) => React.createElement(TextField, Object.assign({}, mergeProperties(params))) });
});
