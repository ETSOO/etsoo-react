import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { Utils } from '../api/Utils';
/**
 * Country list
 */
export const CountryList = React.forwardRef((props, ref) => {
    // Destruct
    const { 
    // eslint-disable-next-line no-shadow
    InputLabelProps, label, loadItems, name, renderInput, sort, ...rest } = props;
    // Cache key
    const cacheKey = Utils.getLocationKey(`countryList${name || ''}`);
    // Cache data
    const cacheData = Utils.cacheSessionDataParse(cacheKey);
    // State
    const [items, updateItems] = React.useState(cacheData || []);
    // Public methods through ref
    React.useImperativeHandle(ref, () => ({}));
    // Layout ready
    React.useEffect(() => {
        if (!cacheData) {
            // Load items
            loadItems().then((loadedItems) => {
                // Update state
                updateItems(loadedItems);
                // Sort the list items
                if (sort) {
                    sort(loadedItems);
                }
                // Cache data
                Utils.cacheSessionData(loadedItems, cacheKey);
            });
        }
    }, [cacheData]);
    // Merge the input's properties
    // renderInput is a callback function with well prepared 'params'
    // need to be destructured to the TextField component
    const mergeProperties = (params) => {
        // Merge well prepared properties, rest properties, shallow copy
        const merged = {
            label, name, ...params
        };
        // Support to merge the 'InputLabelProps' sub property collection
        if (InputLabelProps) {
            Object.assign(merged.InputLabelProps, InputLabelProps);
        }
        // Return
        return merged;
    };
    // Default render of the input component
    const renderInputLocal = renderInput
        || ((params) => React.createElement(TextField, Object.assign({}, mergeProperties(params))));
    // Return
    return (React.createElement(Autocomplete, Object.assign({ options: items, renderInput: renderInputLocal }, rest)));
});
