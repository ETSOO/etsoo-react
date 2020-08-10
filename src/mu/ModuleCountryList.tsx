import React from 'react';
import { CountryListRef, CountryListProps, CountryList } from './CountryList';
import { IDynamicData } from '../api/IDynamicData';

/**
 * Country list properties
 */
export type ModuleCountryListProps = Omit<
    CountryListProps,
    'loadItems' | 'sort'
> & {};

/**
 * Module country list
 */
export const ModuleCountryList = React.forwardRef<
    CountryListRef,
    ModuleCountryListProps
>((props, ref) => {
    // Label format
    const getOptionLabel = (item: IDynamicData) => item.short_name || item.name;

    // Load data
    const loadItems = () => Promise.resolve([] as IDynamicData[]);

    // Return
    return (
        <CountryList
            getOptionLabel={getOptionLabel}
            loadItems={loadItems}
            ref={ref}
            {...props}
        />
    );
});
ModuleCountryList.displayName = 'ModuleCountryList';
