import React from 'react';
import {
    LoadingAutocompleteCache,
    LoadingAutocomplete,
    LoadingAutocompleteProps
} from '../mu/LoadingAutocomplete';
import { RegionListItem } from '../controllers/ExtendAddress';

/**
 * Region list properties
 */
export type RegionListProps = Omit<
    LoadingAutocompleteProps<RegionListItem>,
    'getOptionLabel' | 'cache'
>;

// Display label
const getOptionLabel = (option: RegionListItem) => option.name || '';

// Filter options
const filterOptions = (
    options: RegionListItem[],
    { inputValue }: { inputValue: string }
) => {
    return options.filter(
        (option) =>
            option.cid === inputValue.toUpperCase() ||
            (option.abbr &&
                new RegExp(`^${inputValue}`, 'gi').test(option.abbr)) ||
            new RegExp(`^${inputValue}`, 'gi').test(option.name)
    );
};

/**
 * Region list
 */
export function RegionList(props: RegionListProps) {
    // Return
    return (
        <LoadingAutocomplete<RegionListItem>
            {...props}
            cache={LoadingAutocompleteCache.Session}
            getOptionLabel={getOptionLabel}
            filterOptions={filterOptions}
        />
    );
}
