import React from "react"
import {Autocomplete, AutocompleteRenderInputParams} from '@material-ui/lab'
import { TextField, TextFieldProps } from "@material-ui/core"
import { Utils } from "../api/Utils"
import { IDynamicData } from "../api/IDynamicData"

/**
 * Country list ref
 */
export interface CountryListRef {

}

/**
 * Country list properties
 */
export type CountryListProps = TextFieldProps & {
    /**
     * Callback to load country list items
     */
    loadItems(): Promise<IDynamicData[]>
}

/**
 * Country list
 */
export const CountryList = React.forwardRef<CountryListRef, CountryListProps>(({className, InputLabelProps, id, loadItems, name, style, ...rest}, ref) => {
    // Cache key
    const cacheKey = Utils.getLocationKey('countryList' + (id || name || ''))

    // Cache data
    const cacheData = Utils.cacheSessionDataParse<IDynamicData[]>(cacheKey)

    // State
    const [items, updateItems] = React.useState<IDynamicData[]>(cacheData || [])

    // Layout ready
    React.useEffect(() => {
        if(!cacheData) {
            // Load items
            loadItems().then((items) => {
                // Update state
                updateItems(items)

                // Cache data
                Utils.cacheSessionData(items, cacheKey)
            })
        }
    }, [cacheData])

    // Merge the input's properties
    const mergeProperties = (params: AutocompleteRenderInputParams) => {
        // Merge well prepared properties, rest properties, shallow copy
        let merged = Object.assign({name, InputLabelProps: {}}, rest, params)

        // Support to merge the 'InputLabelProps' sub property collection
        if(InputLabelProps)
            Object.assign(merged.InputLabelProps, InputLabelProps)

        // Return
        return merged
    }

    // Return
    return <Autocomplete
        id={id}
        options={items}
        className={className}
        style={style}
        getOptionLabel={(item) => item.short_name || item.name}
        // renderInput is a callback function with well prepared 'params' need to be destructured to the TextField component
        renderInput={(params) => <TextField {...mergeProperties(params)} />}
    />
})