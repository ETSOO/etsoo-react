import React from "react"
import {Autocomplete, AutocompleteRenderInputParams, AutocompleteProps} from '@material-ui/lab'
import { TextField, InputLabelProps } from "@material-ui/core"
import { Utils } from "../api/Utils"
import { IDynamicData } from "../api/IDynamicData"

/**
 * Country list ref
 */
export interface CountryListRef {

}

/**
 * Country list properties
 * property 'options' is not necessary
 * property 'ref' is incorrect here confused by the Autocomplete's ref
 */
export type CountryListProps = Partial<Omit<AutocompleteProps<IDynamicData, undefined, undefined, undefined>, 'options' | 'ref'>> & {
    /**
     * Label
     */
    label?: string

    /**
     * Callback to load country list items
     */
    loadItems(): Promise<IDynamicData[]>

    /**
     * Name
     */
    name?: string

    /**
     * Input label properties
     */
    InputLabelProps?: Partial<InputLabelProps>

    /**
     * Sort callback
     * Avoid any copy actions to keep good performance
     * @param items List items
     */
    sort?(items: IDynamicData[]): void
}

/**
 * Country list
 */
export const CountryList = React.forwardRef<CountryListRef, CountryListProps>(({InputLabelProps, label, loadItems, name, renderInput, sort, ...rest}, ref) => {
    // Cache key
    const cacheKey = Utils.getLocationKey('countryList' + (name || ''))

    // Cache data
    const cacheData = Utils.cacheSessionDataParse<IDynamicData[]>(cacheKey)

    // State
    const [items, updateItems] = React.useState<IDynamicData[]>(cacheData || [])

    // Public methods through ref
    React.useImperativeHandle(ref, () => ({

    }))

    // Layout ready
    React.useEffect(() => {
        if(!cacheData) {
            // Load items
            loadItems().then((items) => {
                // Update state
                updateItems(items)

                // Sort the list items
                if(sort)
                    sort(items)

                // Cache data
                Utils.cacheSessionData(items, cacheKey)
            })
        }
    }, [cacheData])

    // Merge the input's properties
    // renderInput is a callback function with well prepared 'params' need to be destructured to the TextField component
    const mergeProperties = (params: AutocompleteRenderInputParams) => {
        // Merge well prepared properties, rest properties, shallow copy
        let merged = Object.assign({label, name, InputLabelProps: {}}, params)

        // Support to merge the 'InputLabelProps' sub property collection
        if(InputLabelProps)
            Object.assign(merged.InputLabelProps, InputLabelProps)

        // Return
        return merged
    }

    // Default render of the input component
    const renderInputLocal = renderInput || ((params) => {
        return <TextField {...mergeProperties(params)} />
    })

    // Return
    return <Autocomplete
        options={items}
        renderInput={renderInputLocal}
        {...rest}
    />
})