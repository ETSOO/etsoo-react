import React from 'react';
import {
    LoadingAutocompleteCache,
    LoadingAutocomplete,
    LoadingAutocompleteProps
} from '../mu/LoadingAutocomplete';
import { CityListItem } from '../controllers/ExtendAddress';

/**
 * City list properties
 */
export type CityListProps = Omit<
    LoadingAutocompleteProps<CityListItem>,
    'getOptionLabel' | 'cache'
>;

// Display label
const getOptionLabel = (option: CityListItem) => option.name || '';

// Filter options
const filterOptions = (
    options: CityListItem[],
    { inputValue }: { inputValue: string }
) => {
    return options.filter(
        (option) =>
            option.cid === inputValue.toUpperCase() ||
            option.phoneCode === inputValue ||
            new RegExp(`^${inputValue}`, 'gi').test(option.name)
    );
};

/**
 * City list
 */
export function CityList(props: CityListProps) {
    // Return
    return (
        <LoadingAutocomplete<CityListItem>
            {...props}
            cache={LoadingAutocompleteCache.Session}
            getOptionLabel={getOptionLabel}
            filterOptions={filterOptions}
        />
    );
}
