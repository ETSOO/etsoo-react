import React from 'react';
import { DataTypes } from '@etsoo/shared';
import { CountryListRef, CountryListProps, CountryList } from './CountryList';

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
    const getOptionLabel = (item: DataTypes.DynamicData) =>
        item.short_name || item.name;

    // Load data
    const loadItems = () => Promise.resolve([] as DataTypes.DynamicData[]);

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
