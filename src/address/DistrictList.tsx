import React from 'react';
import {
    LoadingAutocompleteCache,
    LoadingAutocompleteProps,
    LoadingAutocomplete
} from '../mu/LoadingAutocomplete';
import { DistrictListItem } from '../controllers/ExtendAddress';

/**
 * District list properties
 */
export type DistrictListProps = Omit<
    LoadingAutocompleteProps<DistrictListItem>,
    'getOptionLabel' | 'cache'
>;

// Display label
const getOptionLabel = (option: DistrictListItem) => option.name || '';

// Filter options
const filterOptions = (
    options: DistrictListItem[],
    { inputValue }: { inputValue: string }
) => {
    return options.filter((option) =>
        new RegExp(`^${inputValue}`, 'gi').test(option.name)
    );
};

/**
 * District list
 */
export function DistrictList(props: DistrictListProps) {
    // Return
    return (
        <LoadingAutocomplete<DistrictListItem>
            {...props}
            cache={LoadingAutocompleteCache.Session}
            getOptionLabel={getOptionLabel}
            filterOptions={filterOptions}
        />
    );
}
